// Copyright 2020-2024 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: GPL-3.0

import assert from 'assert';
import { Injectable } from '@nestjs/common';
import { ApiPromise } from '@polkadot/api';
import { RuntimeVersion } from '@polkadot/types/interfaces';
import { profiler } from '@subql/node-core';
import { SubstrateBlock } from '@subql/types';
import * as SubstrateUtil from '../../utils/substrate';
import { ApiService } from '../api.service';
import { SpecVersion } from '../dictionary';
export const SPEC_VERSION_BLOCK_GAP = 100;
type GetLatestFinalizedHeight = () => number;

@Injectable()
export abstract class BaseRuntimeService {
  private _parentSpecVersion?: number;
  private _specVersionMap?: SpecVersion[];
  protected _currentRuntimeVersion?: RuntimeVersion;
  private _latestFinalizedHeight?: number;

  constructor(protected apiService: ApiService) {}

  get parentSpecVersion(): number {
    assert(
      this._parentSpecVersion !== undefined,
      'parentSpecVersion is undefined',
    );
    return this._parentSpecVersion;
  }
  set parentSpecVersion(value: number) {
    this._parentSpecVersion = value;
  }
  get specVersionMap(): SpecVersion[] {
    assert(this._specVersionMap !== undefined, 'specVersionMap is undefined');
    return this._specVersionMap;
  }
  set specVersionMap(value: SpecVersion[]) {
    this._specVersionMap = value;
  }

  protected get currentRuntimeVersion(): RuntimeVersion {
    assert(
      this._currentRuntimeVersion !== undefined,
      'currentRuntimeVersion is undefined',
    );
    return this._currentRuntimeVersion;
  }
  protected set currentRuntimeVersion(value: RuntimeVersion) {
    this._currentRuntimeVersion = value;
  }

  get latestFinalizedHeight(): number {
    assert(
      this._latestFinalizedHeight !== undefined,
      'latestFinalizedHeight is undefined',
    );
    return this._latestFinalizedHeight;
  }
  set latestFinalizedHeight(value: number) {
    this._latestFinalizedHeight = value;
  }

  async specChanged(height: number, specVersion: number): Promise<boolean> {
    if (this.parentSpecVersion !== specVersion) {
      const parentSpecVersionCopy = this.parentSpecVersion;
      this.parentSpecVersion = specVersion;
      await this.prefetchMeta(height);
      // When runtime init parentSpecVersion is undefined, count as unchanged,
      // so it will not use fetchRuntimeVersionRange
      return parentSpecVersionCopy !== undefined;
    }
    return false;
  }

  abstract getSpecVersion(
    blockHeight: number,
  ): Promise<{ blockSpecVersion: number; syncedDictionary: boolean }>;

  init(getLatestFinalizedHeight: GetLatestFinalizedHeight): void {
    this.latestFinalizedHeight = getLatestFinalizedHeight();
  }

  get api(): ApiPromise {
    return this.apiService.api;
  }

  getSpecFromMap(
    blockHeight: number,
    specVersions: SpecVersion[],
  ): number | undefined {
    //return undefined block can not find inside range
    const spec = specVersions.find(
      (spec) => blockHeight >= spec.start && blockHeight <= spec.end,
    );
    return spec ? Number(spec.id) : undefined;
  }

  async getSpecFromApi(height: number): Promise<number> {
    const parentBlockHash = await this.api.rpc.chain.getBlockHash(
      Math.max(height - 1, 0),
    );
    const runtimeVersion =
      await this.api.rpc.state.getRuntimeVersion(parentBlockHash);
    const specVersion = runtimeVersion.specVersion.toNumber();
    return specVersion;
  }

  @profiler()
  async prefetchMeta(height: number): Promise<void> {
    const blockHash = await this.api.rpc.chain.getBlockHash(height);
    if (
      this.parentSpecVersion !== undefined &&
      this.specVersionMap &&
      this.specVersionMap.length !== 0
    ) {
      const parentSpecVersion = this.specVersionMap.find(
        (spec) => Number(spec.id) === this.parentSpecVersion,
      );
      if (parentSpecVersion === undefined) {
        await SubstrateUtil.prefetchMetadata(this.api, blockHash);
      } else {
        for (const specVersion of this.specVersionMap) {
          if (
            specVersion.start > parentSpecVersion.end &&
            specVersion.start <= height
          ) {
            const blockHash = await this.api.rpc.chain.getBlockHash(
              specVersion.start,
            );
            await SubstrateUtil.prefetchMetadata(this.api, blockHash);
          }
        }
      }
    } else {
      await SubstrateUtil.prefetchMetadata(this.api, blockHash);
    }
  }

  async getRuntimeVersion(block: SubstrateBlock): Promise<RuntimeVersion> {
    if (
      !this.currentRuntimeVersion ||
      this.currentRuntimeVersion.specVersion.toNumber() !== block.specVersion
    ) {
      this.currentRuntimeVersion = await this.api.rpc.state.getRuntimeVersion(
        block.block.header.parentHash,
      );
    }
    return this.currentRuntimeVersion;
  }
}
