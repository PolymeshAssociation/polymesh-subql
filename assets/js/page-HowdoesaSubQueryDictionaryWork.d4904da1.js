(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{681:function(e,t,a){"use strict";a.r(t);var n=a(1),i=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"how-does-a-subquery-dictionary-work"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#how-does-a-subquery-dictionary-work"}},[e._v("#")]),e._v(" How does a SubQuery Dictionary Work?")]),e._v(" "),a("p",[e._v("The whole idea of a generic dictionary project is to index all the data from a blockchain and record the events, extrinsics, and its types (module and method) in a database in order of block height. Another project can then query this "),a("code",[e._v("network.dictionary")]),e._v(" endpoint instead of the default "),a("code",[e._v("network.endpoint")]),e._v(" defined in the manifest file.")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("network.dictionary")]),e._v(" endpoint is an optional parameter that if present, the SDK will automatically detect and use. "),a("code",[e._v("network.endpoint")]),e._v(" is mandatory and will not compile if not present.")]),e._v(" "),a("p",[e._v("Taking the "),a("a",{attrs:{href:"https://github.com/subquery/subql-dictionary",target:"_blank",rel:"noopener noreferrer"}},[e._v("SubQuery dictionary"),a("OutboundLink")],1),e._v(" project as an example, the "),a("a",{attrs:{href:"https://github.com/subquery/subql-dictionary/blob/main/schema.graphql",target:"_blank",rel:"noopener noreferrer"}},[e._v("schema"),a("OutboundLink")],1),e._v(" file defines 3 entities; extrinsic, events, specVersion. These 3 entities contain 6, 4, and 2 fields respectively. When this project is run, these fields are reflected in the database tables.")]),e._v(" "),a("p",[a("img",{attrs:{src:"/assets/img/extrinsics_table.png",alt:"extrinsics table"}}),e._v(" "),a("img",{attrs:{src:"/assets/img/events_table.png",alt:"events table"}}),e._v(" "),a("img",{attrs:{src:"/assets/img/specversion_table.png",alt:"specversion table"}})]),e._v(" "),a("p",[e._v("Data from the blockchain is then stored in these tables and indexed for performance. The project is then hosted in SubQuery Projects and the API endpoint is available to be added to the manifest file.")]),e._v(" "),a("h2",{attrs:{id:"how-to-incorporate-a-dictionary-into-your-project"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#how-to-incorporate-a-dictionary-into-your-project"}},[e._v("#")]),e._v(" How to incorporate a dictionary into your project?")]),e._v(" "),a("p",[e._v("Add "),a("code",[e._v("dictionary: https://api.subquery.network/sq/subquery/dictionary-polkadot")]),e._v(" to the network section of the manifest. Eg:")]),e._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[e._v("network:\n  endpoint: wss://polkadot.api.onfinality.io/public-ws\n  dictionary: https://api.subquery.network/sq/subquery/dictionary-polkadot\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br")])]),a("h2",{attrs:{id:"what-happens-when-a-dictionary-is-not-used"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-happens-when-a-dictionary-is-not-used"}},[e._v("#")]),e._v(" What happens when a dictionary IS NOT used?")]),e._v(" "),a("p",[e._v("When a dictionary is NOT used, an indexer will fetch every block data via the polkadot api according to the "),a("code",[e._v("batch-size")]),e._v(" flag which is 100 by default, and place this in a buffer for processing. Later, the indexer takes all these blocks from the buffer and while processing the block data, checks whether the event and extrinsic in these blocks match the user-defined filter.")]),e._v(" "),a("h2",{attrs:{id:"what-happens-when-a-dictionary-is-used"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-happens-when-a-dictionary-is-used"}},[e._v("#")]),e._v(" What happens when a dictionary IS used?")]),e._v(" "),a("p",[e._v("When a dictionary IS used, the indexer will first take the call and event filters as parameters and merge this into a GraphQL query. It then uses the dictionary's API to obtain a list of relevant block heights only that contains the specific events and extrinsics. Often this is substantially less than 100 if the default is used.")]),e._v(" "),a("p",[e._v("For example, imagine a situation where you're indexing transfer events. Not all blocks have this event (in the image below there are no transfer events in blocks 3 and 4).")]),e._v(" "),a("p",[a("img",{attrs:{src:"/assets/img/dictionary_blocks.png",alt:"dictionary block"}})]),e._v(" "),a("p",[e._v("The dictionary allows your project to skip this so rather than looking in each block for a transfer event, it skips to just blocks 1, 2, and 5. This is because the dictionary is a pre-computed reference to all calls and events in each block.")]),e._v(" "),a("p",[e._v("This means that using a dictionary can reduce the amount of data that the indexer obtains from the chain and reduce the number of “unwanted” blocks stored in the local buffer. But compared to the traditional method, it adds an additional step to get data from the dictionary’s API.")]),e._v(" "),a("h2",{attrs:{id:"when-is-a-dictionary-not-useful"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#when-is-a-dictionary-not-useful"}},[e._v("#")]),e._v(" When is a dictionary NOT useful?")]),e._v(" "),a("p",[e._v("When "),a("a",{attrs:{href:"https://doc.subquery.network/create/mapping.html#block-handler",target:"_blank",rel:"noopener noreferrer"}},[e._v("block handlers"),a("OutboundLink")],1),e._v(" are used to grab data from a chain, every block needs to be processed. Therefore, using a dictionary in this case does not provide any advantage and the indexer will automatically switch to the default non-dictionary approach.")]),e._v(" "),a("p",[e._v("Also, when dealing with events or extrinsic that occur or exist in every block such as "),a("code",[e._v("timestamp.set")]),e._v(", using a dictionary will not offer any additional advantage.")])])}),[],!1,null,null,null);t.default=i.exports}}]);