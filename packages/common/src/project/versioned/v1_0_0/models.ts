// Copyright 2020-2023 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: GPL-3.0

import {Type} from 'class-transformer';
import {Equals, IsBoolean, IsObject, IsOptional, IsString, Validate, ValidateNested} from 'class-validator';
import {SemverVersionValidator} from '../../utils';
import {FileReference, NodeOptions, NodeSpec, QuerySpec} from './types';

export class RunnerQueryBaseModel implements QuerySpec {
  @Equals('@subql/query')
  name: string;
  @IsString()
  @Validate(SemverVersionValidator)
  // @Matches(RUNNER_REGEX)
  version: string;
}

export class RunnerNodeImpl implements NodeSpec {
  @IsString()
  name: string;
  @IsString()
  @Validate(SemverVersionValidator)
  // @Matches(RUNNER_REGEX,{message: 'runner version is not correct'})
  version: string;
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => RunnerNodeOptionsModel)
  options?: NodeOptions;
}

export class RunnerNodeOptionsModel implements NodeOptions {
  @IsOptional()
  @IsBoolean()
  historical?: boolean;
  @IsOptional()
  @IsBoolean()
  unsafe?: boolean;
  @IsOptional()
  @IsBoolean()
  unfinalizedBlocks?: boolean;
}

export class FileType implements FileReference {
  @IsString()
  file: string;
}
