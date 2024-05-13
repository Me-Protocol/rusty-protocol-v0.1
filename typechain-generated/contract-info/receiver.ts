export const ContractAbi = `{"source":{"hash":"0xa5cd4cf9006affba97e66434197b42bb3ead1940631649cd40a9d078939b040c","language":"ink! 4.3.0","compiler":"rustc 1.78.0-nightly","build_info":{"build_mode":"Debug","cargo_contract_version":"3.2.0","rust_toolchain":"nightly-aarch64-apple-darwin","wasm_opt_settings":{"keep_debug_symbols":false,"optimization_passes":"Z"}}},"contract":{"name":"receiver","version":"0.1.0","authors":["[your_name] <[your_email]>"]},"spec":{"constructors":[{"args":[],"default":false,"docs":[],"label":"new","payable":false,"returnType":{"displayName":["ink_primitives","ConstructorResult"],"type":1},"selector":"0x9bae9d5e"},{"args":[],"default":false,"docs":[],"label":"default","payable":false,"returnType":{"displayName":["ink_primitives","ConstructorResult"],"type":1},"selector":"0xed4b9d1b"}],"docs":[],"environment":{"accountId":{"displayName":["AccountId"],"type":5},"balance":{"displayName":["Balance"],"type":8},"blockNumber":{"displayName":["BlockNumber"],"type":0},"chainExtension":{"displayName":["ChainExtension"],"type":11},"hash":{"displayName":["Hash"],"type":9},"maxEventTopics":4,"timestamp":{"displayName":["Timestamp"],"type":10}},"events":[],"lang_error":{"displayName":["ink","LangError"],"type":3},"messages":[{"args":[],"default":false,"docs":[],"label":"recieve","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":4},"selector":"0xb32c34d6"}]},"storage":{"root":{"layout":{"struct":{"fields":[{"layout":{"leaf":{"key":"0x00000000","ty":0}},"name":"some_value"}],"name":"Receiver"}},"root_key":"0x00000000"}},"types":[{"id":0,"type":{"def":{"primitive":"u32"}}},{"id":1,"type":{"def":{"variant":{"variants":[{"fields":[{"type":2}],"index":0,"name":"Ok"},{"fields":[{"type":3}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":2},{"name":"E","type":3}],"path":["Result"]}},{"id":2,"type":{"def":{"tuple":[]}}},{"id":3,"type":{"def":{"variant":{"variants":[{"index":1,"name":"CouldNotReadInput"}]}},"path":["ink_primitives","LangError"]}},{"id":4,"type":{"def":{"variant":{"variants":[{"fields":[{"type":0}],"index":0,"name":"Ok"},{"fields":[{"type":3}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":0},{"name":"E","type":3}],"path":["Result"]}},{"id":5,"type":{"def":{"composite":{"fields":[{"type":6,"typeName":"[u8; 32]"}]}},"path":["ink_primitives","types","AccountId"]}},{"id":6,"type":{"def":{"array":{"len":32,"type":7}}}},{"id":7,"type":{"def":{"primitive":"u8"}}},{"id":8,"type":{"def":{"primitive":"u128"}}},{"id":9,"type":{"def":{"composite":{"fields":[{"type":6,"typeName":"[u8; 32]"}]}},"path":["ink_primitives","types","Hash"]}},{"id":10,"type":{"def":{"primitive":"u64"}}},{"id":11,"type":{"def":{"variant":{}},"path":["ink_env","types","NoChainExtension"]}}],"version":"4"}`;
export const ContractFile = `{"source":{"hash":"0xa5cd4cf9006affba97e66434197b42bb3ead1940631649cd40a9d078939b040c","language":"ink! 4.3.0","compiler":"rustc 1.78.0-nightly","wasm":"0x0061736d01000000013b0a60027f7f017f60037f7f7f017f60027f7f0060037f7f7f0060017f0060047f7f7f7f0060000060047f7f7f7f017f6000017f60057f7f7f7f7f00028a0107057365616c310b6765745f73746f726167650007057365616c301176616c75655f7472616e736665727265640002057365616c3005696e7075740002057365616c320b7365745f73746f726167650007057365616c300b7365616c5f72657475726e0003057365616c300d64656275675f6d657373616765000003656e76066d656d6f7279020102100333320105020800040406040600000402030200000400020303060405020103000000020000000203000103010105030905000002040501700110100608017f01418080040b0711020463616c6c000d066465706c6f79000f0915010041010b0f10281127181918212317272c2518260ab244322b01017f037f2002200346047f200005200020036a200120036a2d00003a0000200341016a21030c010b0b0b2300200120034b044020012003419081041032000b20002001360204200020023602000bbd0201077f230041106b220424002004200028020036020c2004410c6a2107230041106b2200240002402001280208220241046a220320024f0440200041086a210520012802002108200128020421060240200220034d0440200320064d0d012003200641b487041032000b230041306b220024002000200336020420002002360200200041146a42023702002000412c6a41043602002000410236020c200041cc9704360208200041043602242000200041206a3602102000200041046a36022820002000360220200041086a41b48704102a000b2005200320026b3602042005200220086a3602002000280208200028020c200741c4870410342001280208220241046a220320024f0d0141f08504411c41d48704102b000b41f08504411c41a48704102b000b20012003360208200041106a2400200441106a24000b5502027f027e230041206b22002400200041106a22014200370300200042003703082000411036021c200041086a2000411c6a10012001290300210220002903082103200041206a2400410541042002200384501b0b0f00200141003600002000200110160b5f01017f230041106b22012400200142808001370208200141bd9d04360204200141046a2000280200047f200141046a4101101341010541000b1013200128020c2200418180014f0440200041808001419082041032000b410120001015000bbb0102057f017e230041306b2201240020014100360220200142808001370228200141bd9d0436022441d88304200141246a2202100820012001290224370218200141106a200141186a2203200128022c10142001280214210420012802102105200129021821062001410036022c2001200637022420002002100820012001290224370218200141086a2003200128022c10142001200520042001280208200128020c1003220036020420012000417f47360200200141306a24000bc10501067f230041d0006b2200240002400240100941ff0171410546044020004180800136023441bd9d04200041346a22011002200041186a200028023441bd9d044180800110072000200029031837023402402001200041286a100a0d0020002d002841b3014720002d0029412c477220002d002a4134477220002d002b41d60147720d002000410036022020004100360230200042808001370238200041bd9d04360234200041206a200041346a2202100820002000290234370228200041106a200041286a200028023c10142000280214210320002802102104200028022821012000200028022c2205360234200420032001200210002102200041086a200028023420012005100702400240024020020e0402000001000b200041406b420037020020004101360238200041bc82043602342000419c800436023c200041346a41c48204102a000b200041406b420037020020004101360238200041f483043602340c040b200028020821012000200028020c360238200020013602342000410036024c200041346a200041cc006a10160d022000200028024c360224200041246a220128020041016a220245044041808004411c41ac8404102b000b2001200236020020002802242103230041106b220124002001200336020c2001410c6a100c200141106a24002000410036023420002002360238230041106b22012400200142808001370208200141bd9d043602040240200041346a2200280200450440200141046a220241001013200041046a200210080c010b200141046a2200410110132000410110130b200128020c2200418180014f0440200041808001419082041032000b410020001015000b20004101360234200041346a100b000b200041043a0034200041346a100e000b200041406b420037020020004101360238200041a484043602340b2000419c800436023c200041346a41c88304102a000b4801017f230041206b220124002001410c6a4201370200200141013602042001419c80043602002001410136021c200120003602182001200141186a360208200141c88304102a000bdf0201057f230041206b2200240002401009220141ff0171410546044020004180800136021841bd9d04200041186a22011002200041086a200028021841bd9d044180800110072000200029030837021802402001200041146a100a0d0020002d0017210120002d0016210220002d0015210320002d00142204419b01470440200341cb00472002419d0147722001411b4772200441ed0147720d010c030b200341ae01472002419d014772200141de004772450d020b20004101360218200041186a100b000b200020013a0018200041186a100e000b20004100360214200041146a100c20004200370218230041106b22012400200142808001370208200141bd9d04360204200141046a027f200041186a2200280200450440200141046a4100101320002802044100470c010b200141046a4101101341010b1013200128020c2200418180014f0440200041808001419082041032000b410020001015000b7c01017f230041306b22022400200241146a42013702002002410136020c200241bc840436020820024102360224200220002d0000410274220041bc85046a28020036022c2002200041d085046a2802003602282002200241206a3602102002200241286a3602202001200241086a10292100200241306a240020000bf90201067f20002802002105230041306b220224004101210302402001280214220641b89204410c200141186a28020028020c22071101000d00200528020c2104230041306b220024002000412c6a410b360200200041246a410b3602002000410c6a4203370200200041033602042000419092043602002000410236021c2000200436021820002004410c6a3602282000200441086a3602202000200041186a3602082001200010292104200041306a240020040d00200528020822000440200641c49204410220071101000d01200241286a200041106a290200370300200241206a200041086a290200370300200220002902003703182001200241186a102921030c010b200241086a20052802002200200528020428020c11020041002103200229030842c1f7f9e8cc93b2d14185200241106a29030042e4dec78590d085de7d858450450d0041012103200641c49204410220071101000d00200620002802002000280204200711010021030b200241306a240020030b970501097f230041306b22022400200220003602002002411c6a420137020020024102360214200241a486043602102002410336022c2002200241286a36021820022002360228200241046a2104230041106b22052400200241106a2200410c6a280200210102400240027f0240024020002802040e020001030b20010d024100210041e485040c010b20010d0120002802002201280204210020012802000b2101200541086a2000101a20052802082103200528020c20012000100621012004200036020820042001360204200420033602000c010b230041206b22012400200141086a027f027f410020002802002206200028020422094103746a22072006460d001a200641046a2108200720066b4103762107024003402003200320082802006a22034b0d01200841086a2108200741016b22070d000b20030c010b41808904411c41d48a04102b000b22032000410c6a280200450d001a2009452003410f4b7245044041002006280204450d011a0b20034101744100200341004e1b0b101a2001410036021820012001290308370210200141106a200010170440230041406a220024002000413336020c200041d88d04360208200041c4890436021420002001411f6a360210200041246a42023702002000413c6a410c3602002000410236021c2000418c9304360218200041023602342000200041306a3602202000200041106a3602382000200041086a360230200041186a41f88e04102a000b20042001290210370200200441086a200141186a280200360200200141206a24000b200541106a240020022802082100200228020c2102024041bd9d052d000045044041be9d052d00000d010b410c20002002100522002000410c4f1b410947044041bd9d0541013a00000b41be9d0541013a00000b000b970101027f20002802082202200028020422034904402000200241016a360208200028020020026a20013a00000f0b230041306b220024002000200336020420002002360200200041146a42023702002000412c6a41043602002000410236020c200041f89204360208200041043602242000200041206a360210200020003602282000200041046a360220200041086a41e48704102a000b7701027f230041206b220324002002200128020422044b0440200341146a42003702002003410136020c200341988604360208200341e48504360210200341086a41f48704102a000b2001200420026b36020420012001280200220120026a3602002000200236020420002001360200200341206a24000b0d00200041bd9d0420011004000b3b01027f200028020422024104492203450440200141042000280200220141f0880410342000200241046b3602042000200141046a3602000b20030b0c00200041e48a042001102d0b0300010b1b00200128021441d489044105200141186a28020028020c1101000b920101047f230041106b22022400200241086a2105230041106b2204240002400240024002402001450440410121030c010b200141004e2203450d01200441086a20032001101b20042802082203450d020b2005200336020420052001360200200441106a24000c020b101d000b2001101e000b200228020c21012000200228020836020020002001360204200241106a24000b3701017f230041106b22032400200341086a20012002101c200328020c21012000200328020836020020002001360204200341106a24000b25002002044041bc9d042d00001a20012002102421010b20002002360204200020013602000b3c01017f230041206b22002400200041146a42003702002000410136020c200041908c043602082000419c8904360210200041086a41988c04102a000b8d0101017f230041306b220124002001200036020c2001411c6a420137020020014102360214200141b88d043602102001410436022c2001200141286a36021820012001410c6a360228230041206b22002400200041003a001d200041003a001c200041c88d043602182000200141106a360214200041a892043602102000418c920436020c2000410c6a1012000bc50301057f230041206b220424000240027f4100200220036a22032002490d001a200128020022024100480d01410820024101742205200320032005491b2203200341084d1b2203417f73411f76210802402002450440200441003602180c010b2004200236021c20044101360218200420012802043602140b200441146a2106230041106b22052400200441086a2207027f02402008044020034100480d01027f2006280204044020062802082202450440200541086a41012003101c20052802082102200528020c0c020b2006280200210841012003102422060440200620082002200320022003491b10061a0b2006210220030c010b200541012003101b2005280200210220052802040b21062002044020072002360204200741086a200636020041000c030b20074101360204200741086a200336020041010c020b20074100360204200741086a200336020041010c010b2007410036020441010b360200200541106a24002004280208450440200428020c210220012003360200200120023602044181808080780c010b200441106a2802002103200428020c0b21012000200336020420002001360200200441206a24000f0b41a08904412141ec8b04102b000b1f00024020004181808080784704402000450d012001101e000b0f0b101d000b0c00200020012002102241000b7701027f230041106b2204240020022000280200200028020822036b4b0440200441086a200020032002101f2004280208200428020c1020200028020821030b200028020420036a2001200210061a2003200220036a22014b044041808904411c41889004102b000b20002001360208200441106a24000bca0201047f230041106b2202240002400240027f0240024020014180014f04402002410036020c2001418010490d012001418080044f0d0220022001410c7641e001723a000c20022001410676413f71418001723a000d4102210341030c030b200028020822032000280200460440230041106b22042400200441086a200020034101101f2004280208200428020c1020200441106a2400200028020821030b200028020420036a20013a0000200341016a2201450d04200020013602080c030b2002200141067641c001723a000c4101210341020c010b20022001410676413f71418001723a000e20022001410c76413f71418001723a000d2002200141127641077141f001723a000c4103210341040b210420032002410c6a2205722001413f71418001723a000020002005200410220b200241106a240041000f0b41808904411c41f88f04102b000bdc0101047f230041106b22022400200241086a210402402001200020016a41016b410020006b7122034d044041c09d05280200220020036a22012000490d0141c49d052802002001490440200341ffff036a22012003490d0220014110764000220041ffff034b0d022000411074220020014180807c716a22012000490d0241c49d052001360200200020036a22012000490d020b41c09d052001360200410121050c010b41a09104411c418c9104102b000b200420003602042004200536020020022802082100200228020c2101200241106a24002001410020001b0b0e0020002802001a03400c000b000b21002000429ce2c2ebd0e2e9d15e370308200042ffd19abbce89a8f9967f3703000bbf0602097f027e027f2000350200210b230041406a220324000240024002400240024002400240200b4290ce005a044041272100200b210c034020004104490d08200341196a20006a220241046b200c200c4290ce0080220b4290ce007e7da7220441ffff037141e4006e2205410174418b94046a2f00003b0000200241026b2004200541e4006c6b41ffff0371410174418b94046a2f00003b0000200041046b2100200c42ffc1d72f562102200b210c20020d000b200ba7220241e3004d0d02200041024f0d010c070b41272100200ba7220241e3004d0d020b200041026b2200200341196a6a200ba72202200241ffff037141e4006e220241e4006c6b41ffff0371410174418b94046a2f00003b00000b2002410a4f044020004102490d050c030b20000d010c040b2002410a4f0d010b200041016b2200200341196a6a20024130723a00000c010b200041026b2200200341196a6a2002410174418b94046a2f00003b00000b0240200041274d0440200128021c22064101712207412720006b22056a21024100210420064104710440418c920421042002418c9204418c9204103620026a22024b0d020b412b418080c40020071b2107200341196a20006a2108024020012802004504404101210020012007200410300d01200128021420082005200141186a28020028020c11010021000c010b2002200128020422094f04404101210020012007200410300d01200128021420082005200141186a28020028020c11010021000c010b20064108710440200128021021062001413036021020012d0020210a41012100200141013a002020012007200410300d01200341106a2001200920026b4101103120032802102202418080c400460d0120032802142104200128021420082005200141186a28020028020c1101000d01200220042001102f0d012001200a3a002020012006360210410021000c010b41012100200341086a2001200920026b4101103120032802082202418080c400460d00200328020c210620012007200410300d00200128021420082005200141186a28020028020c1101000d00200220062001102f21000b200341406b240020000c030b0c010b41f09104411c41c49604102b000b41c09104412141ac9d04102b000b0bb30301057f230041306b22022400200028020421042000280200210302400240200128020022062001280208220072044002402000450d002001410c6a28020021002002410036022c200220033602242002200320046a360228200041016a21000340200041016b22000440200241186a200241246a1037200228021c418080c400470d010c020b0b200241106a200241246a10372002280214418080c400460d000240024020022802102205450d00200420054d04404100210020042005460d010c020b41002100200320056a2c00004140480d010b200321000b2005200420001b21042000200320001b21030b2006450440200128021420032004200141186a28020028020c11010021000c030b200128020422002003200320046a103622054d0d01200241086a2001200020056b410010314101210020022802082205418080c400460d02200228020c2106200128021420032004200141186a28020028020c1101000d02200520062001102f21000c020b200128021420032004200141186a28020028020c11010021000c010b200128021420032004200141186a28020028020c11010021000b200241306a240020000b13002000280214200041186a2802002001102d0b3c01017f230041206b22022400200241013b011c2002200136021820022000360214200241a892043602102002418c920436020c2002410c6a1012000b4601017f230041206b220324002003410c6a4200370200200341013602042003418c92043602082003200136021c200320003602182003200341186a36020020032002102a000b140020002802002001200028020428020c1100000b910401077f230041406a22032400200341346a2001360200200341033a003c2003412036022c2003410036023820032000360230200341003602242003410036021c027f02400240200228021022014504402002410c6a28020022004103742105200041ffffffff01712106200228020421082002280200210720022802082101034020042005460d02200420076a220041046a28020022020440200328023020002802002002200328023428020c1101000d040b200441086a21042001280200210020012802042102200141086a210120002003411c6a2002110000450d000b0c020b200241146a28020022044105742100200441ffffff3f7121062002410c6a2802002109200228020821052002280204210820022802002207210403402000450d01200441046a28020022020440200328023020042802002002200328023428020c1101000d030b2003200128021036022c200320012d001c3a003c20032001280218360238200341106a2005200141086a102e2003200329031037021c200341086a20052001102e20032003290308370224200441086a2104200041206b210020012802142102200141206a2101200520024103746a22022802002003411c6a2002280204110000450d000b0c010b200620084904402003280230200720064103746a22002802002000280204200328023428020c1101000d010b41000c010b41010b2101200341406b240020010b5501027f0240027f02400240200228020041016b0e020103000b200241046a0c010b200120022802044103746a2201280204410d470d0120012802000b2802002104410121030b20002004360204200020033602000b4701027f200241186a28020021032002280214210441002102027f0340200120012002460d011a200241016a2102200420002003280210110000450d000b200241016b0b2001490b4b000240027f2001418080c400470440410120002802142001200041186a2802002802101100000d011a0b20020d0141000b0f0b200028021420024100200041186a28020028020c1101000bb20101027f024002400240024020012d0020220441016b0e03010200030b200341ff01710d00410021040c020b20022104410021020c010b200241016a2203044020024101762104200341017621020c010b41f09104411c41d49604102b000b200441016a2104200141186a2802002105200128021021032001280214210102400340200441016b2204450d01200120032005280210110000450d000b418080c40021030b20002002360204200020033602000b6b01017f230041306b220324002003200136020420032000360200200341146a42023702002003412c6a41043602002003410236020c200341989704360208200341043602242003200341206a3602102003200341046a36022820032003360220200341086a2002102a000b6e01017f230041206b2205240020022003490440200541146a42003702002005410136020c200541ec98043602082005418c9204360210200541086a2004102a000b20002003360204200020013602002000200220036b36020c2000200120034102746a360208200541206a24000b7b002001410446044020002002200110061a0f0b230041306b220024002000410436020420002001360200200041146a42023702002000412c6a41043602002000410336020c200041b49904360208200041043602242000200041206a360210200020003602282000200041046a360220200041086a2003102a000b4601017f200145044041000f0b024003402002200220002c000041bf7f4a6a22024b0d01200041016a2100200141016b22010d000b20020f0b41f09104411c419c9d04102b000b8e04010a7f230041106b220224000240200120006b220141104f04402000200041036a417c71220620006b2200103522042006200120006b2200417c716a200041037110356a220320044f0440200041027621050240024003402005450d0520022006200541c0012005200541c0014f1b41d098041033200228020c21052002280208210620022002280200200228020422002000417c7141d09a041033200228020c210820022802082107024020022802042200450440410021000c010b2002280200220420004102746a21094100210003402004220a41106a21044100210102400340200020002001200a6a280200220b417f73410776200b410676724181828408716a22004d0440200141046a22014110470d010c020b0b41f09104411c41909b04102b000b20042009470d000b0b20032003200041087641ff81fc0771200041ff81fc07716a418180046c4110766a22034b0d012008450d000b200841027421014100210003402000200020072802002204417f734107762004410676724181828408716a22004b0d02200741046a2107200141046b22010d000b20032003200041087641ff81fc0771200041ff81fc07716a418180046c4110766a22034d0d0441f09104411c41f09a04102b000b41f09104411c41e09a04102b000b41f09104411c41809b04102b000b41f09104411c41c09a04102b000b20002001103521030b200241106a240020030b900201067f02402000027f418080c400200128020022022001280204460d001a2001200241016a2205360200024020022d0000220341187441187541004e0d002001200241026a220536020020022d0001413f7121042003411f712106200341df014d0440200641067420047221030c010b2001200241036a220536020020022d0002413f712004410674722107200341f00149044020072006410c747221030c010b2001200241046a2205360200418080c4002006411274418080f0007120022d0003413f71200741067472722203418080c400460d011a0b20012802082204200520026b6a22022004490d012001200236020820030b360204200020043602000f0b41f09104411c41909c04102b000b0bb61d0300418080040be305617474656d707420746f206164642077697468206f766572666c6f771c000100000000002f55736572732f61796f6d6964652f2e636172676f2f72656769737472792f7372632f696e6465782e6372617465732e696f2d366631376432326262613135303031662f696e6b5f656e762d342e332e302f7372632f656e67696e652f6f6e5f636861696e2f6578742e7273240001006c000000e4000000170000002f55736572732f61796f6d6964652f2e636172676f2f72656769737472792f7372632f696e6465782e6372617465732e696f2d366631376432326262613135303031662f696e6b5f656e762d342e332e302f7372632f656e67696e652f6f6e5f636861696e2f696d706c732e72730000a00001006e0000002401000032000000656e636f756e746572656420756e6578706563746564206572726f72200101001c000000a00001006e000000ed000000170000002f55736572732f61796f6d6964652f4465736b746f702f576f726b53706163652f4d652050726f746f636f6c2f72757374792d70726f746f636f6c2d76302e312f636f6e7472616374732f6d6f64756c65732f7065726970686572616c732f72656365697665722f72656365697665722e727300540101007300000006000000050000000000000073746f7261676520656e7472792077617320656d70747900dc01010017000000636f756c64206e6f742070726f7065726c79206465636f64652073746f7261676520656e74727900fc010100270000005401010073000000160000001f0000003c02010000000000756e61626c6520746f206465636f64652073656c6563746f72656e636f756e746572656420756e6b6e6f776e2073656c6563746f72756e61626c6520746f206465636f646520696e707574636f756c64206e6f74207265616420696e7075747061696420616e20756e70617961626c65206d657373616765190000001c000000160000001400000019000000440201005d020100790201008f020100a302010041f085040bf10b617474656d707420746f206164642077697468206f766572666c6f776d6964203e206c656e0000000c030100090000000a000000e40201000000000020030100010000002f55736572732f61796f6d6964652f2e636172676f2f72656769737472792f7372632f696e6465782e6372617465732e696f2d366631376432326262613135303031662f696e6b5f656e762d342e332e302f7372632f656e67696e652f6f6e5f636861696e2f6275666665722e727300340301006f0000005a0000001c000000340301006f0000005a00000014000000340301006f0000005a00000031000000340301006f0000005b00000009000000340301006f0000006500000009000000340301006f0000008d000000210000002f55736572732f61796f6d6964652f2e636172676f2f72656769737472792f7372632f696e6465782e6372617465732e696f2d366631376432326262613135303031662f7061726974792d7363616c652d636f6465632d332e362e392f7372632f636f6465632e72730000000404010069000000770000000e000000617474656d707420746f206164642077697468206f766572666c6f7700000000617474656d707420746f206d756c7469706c792077697468206f766572666c6f77000000050000000000000001000000060000004572726f722f55736572732f61796f6d6964652f2e7275737475702f746f6f6c636861696e732f6e696768746c792d616172636836342d6170706c652d64617277696e2f6c69622f727573746c69622f7372632f727573742f6c6962726172792f636f72652f7372632f697465722f7472616974732f616363756d2e72730000d9040100790000009500000001000000070000000c0000000400000008000000090000000a0000002f55736572732f61796f6d6964652f2e7275737475702f746f6f6c636861696e732f6e696768746c792d616172636836342d6170706c652d64617277696e2f6c69622f727573746c69622f7372632f727573742f6c6962726172792f616c6c6f632f7372632f7261775f7665632e72737c05010070000000ac0100001c0000006361706163697479206f766572666c6f77000000fc050100110000007c050100700000003b020000050000002f55736572732f61796f6d6964652f2e7275737475702f746f6f6c636861696e732f6e696768746c792d616172636836342d6170706c652d64617277696e2f6c69622f727573746c69622f7372632f727573742f6c6962726172792f616c6c6f632f7372632f616c6c6f632e72736d656d6f727920616c6c6f636174696f6e206f6620206279746573206661696c65649606010015000000ab0601000d000000280601006e000000a20100000d0000006120666f726d617474696e6720747261697420696d706c656d656e746174696f6e2072657475726e656420616e206572726f722f55736572732f61796f6d6964652f2e7275737475702f746f6f6c636861696e732f6e696768746c792d616172636836342d6170706c652d64617277696e2f6c69622f727573746c69622f7372632f727573742f6c6962726172792f616c6c6f632f7372632f666d742e7273000b0701006c00000079020000200000002f55736572732f61796f6d6964652f2e7275737475702f746f6f6c636861696e732f6e696768746c792d616172636836342d6170706c652d64617277696e2f6c69622f727573746c69622f7372632f727573742f6c6962726172792f616c6c6f632f7372632f7665632f6d6f642e72738807010070000000890700000d0000008807010070000000f8070000090000002f55736572732f61796f6d6964652f2e7275737475702f746f6f6c636861696e732f6e696768746c792d616172636836342d6170706c652d64617277696e2f6c69622f727573746c69622f7372632f727573742f6c6962726172792f636f72652f7372632f616c6c6f632f6c61796f75742e72731808010074000000300100001800000000000000617474656d707420746f206164642077697468206f766572666c6f7700000000617474656d707420746f2073756274726163742077697468206f766572666c6f770041f091040bc90b617474656d707420746f206164642077697468206f766572666c6f77293a00000c090100000000000d090100010000000d090100010000000e00000000000000010000000f00000070616e69636b6564206174203a0a696e646578206f7574206f6620626f756e64733a20746865206c656e20697320206275742074686520696e64657820697320460901002000000066090100120000003a2000000c0901000000000088090100020000002f55736572732f61796f6d6964652f2e7275737475702f746f6f6c636861696e732f6e696768746c792d616172636836342d6170706c652d64617277696e2f6c69622f727573746c69622f7372632f727573742f6c6962726172792f636f72652f7372632f666d742f6e756d2e727330303031303230333034303530363037303830393130313131323133313431353136313731383139323032313232323332343235323632373238323933303331333233333334333533363337333833393430343134323433343434353436343734383439353035313532353335343535353635373538353936303631363236333634363536363637363836393730373137323733373437353736373737383739383038313832383338343835383638373838383939303931393239333934393539363937393839392f55736572732f61796f6d6964652f2e7275737475702f746f6f6c636861696e732f6e696768746c792d616172636836342d6170706c652d64617277696e2f6c69622f727573746c69622f7372632f727573742f6c6962726172792f636f72652f7372632f666d742f6d6f642e72730000d30a01006f000000050500000d000000d30a01006f0000009705000030000000206f7574206f662072616e676520666f7220736c696365206f66206c656e6774682072616e676520656e6420696e646578200000860b010010000000640b010022000000736c69636520696e64657820737461727473206174202062757420656e64732061742000a80b010016000000be0b01000d0000002f55736572732f61796f6d6964652f2e7275737475702f746f6f6c636861696e732f6e696768746c792d616172636836342d6170706c652d64617277696e2f6c69622f727573746c69622f7372632f727573742f6c6962726172792f636f72652f7372632f736c6963652f697465722e72730000dc0b010072000000ce050000250000006d6964203e206c656e000000600c010009000000736f7572636520736c696365206c656e67746820282920646f6573206e6f74206d617463682064657374696e6174696f6e20736c696365206c656e6774682028740c010015000000890c01002b0000000c090100010000002f55736572732f61796f6d6964652f2e7275737475702f746f6f6c636861696e732f6e696768746c792d616172636836342d6170706c652d64617277696e2f6c69622f727573746c69622f7372632f727573742f6c6962726172792f636f72652f7372632f7374722f636f756e742e7273000000cc0c0100710000004700000015000000cc0c0100710000004f00000032000000cc0c0100710000005a00000009000000cc0c010071000000660000000d000000cc0c0100710000006400000011000000cc0c01007100000054000000110000002f55736572732f61796f6d6964652f2e7275737475702f746f6f6c636861696e732f6e696768746c792d616172636836342d6170706c652d64617277696e2f6c69622f727573746c69622f7372632f727573742f6c6962726172792f636f72652f7372632f7374722f697465722e7273a00d010070000000c3000000110000002f55736572732f61796f6d6964652f2e7275737475702f746f6f6c636861696e732f6e696768746c792d616172636836342d6170706c652d64617277696e2f6c69622f727573746c69622f7372632f727573742f6c6962726172792f636f72652f7372632f697465722f7472616974732f616363756d2e7273000000200e01007900000095000000010000009c0901006f000000d701000005","build_info":{"build_mode":"Debug","cargo_contract_version":"3.2.0","rust_toolchain":"nightly-aarch64-apple-darwin","wasm_opt_settings":{"keep_debug_symbols":false,"optimization_passes":"Z"}}},"contract":{"name":"receiver","version":"0.1.0","authors":["[your_name] <[your_email]>"]},"spec":{"constructors":[{"args":[],"default":false,"docs":[],"label":"new","payable":false,"returnType":{"displayName":["ink_primitives","ConstructorResult"],"type":1},"selector":"0x9bae9d5e"},{"args":[],"default":false,"docs":[],"label":"default","payable":false,"returnType":{"displayName":["ink_primitives","ConstructorResult"],"type":1},"selector":"0xed4b9d1b"}],"docs":[],"environment":{"accountId":{"displayName":["AccountId"],"type":5},"balance":{"displayName":["Balance"],"type":8},"blockNumber":{"displayName":["BlockNumber"],"type":0},"chainExtension":{"displayName":["ChainExtension"],"type":11},"hash":{"displayName":["Hash"],"type":9},"maxEventTopics":4,"timestamp":{"displayName":["Timestamp"],"type":10}},"events":[],"lang_error":{"displayName":["ink","LangError"],"type":3},"messages":[{"args":[],"default":false,"docs":[],"label":"recieve","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":4},"selector":"0xb32c34d6"}]},"storage":{"root":{"layout":{"struct":{"fields":[{"layout":{"leaf":{"key":"0x00000000","ty":0}},"name":"some_value"}],"name":"Receiver"}},"root_key":"0x00000000"}},"types":[{"id":0,"type":{"def":{"primitive":"u32"}}},{"id":1,"type":{"def":{"variant":{"variants":[{"fields":[{"type":2}],"index":0,"name":"Ok"},{"fields":[{"type":3}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":2},{"name":"E","type":3}],"path":["Result"]}},{"id":2,"type":{"def":{"tuple":[]}}},{"id":3,"type":{"def":{"variant":{"variants":[{"index":1,"name":"CouldNotReadInput"}]}},"path":["ink_primitives","LangError"]}},{"id":4,"type":{"def":{"variant":{"variants":[{"fields":[{"type":0}],"index":0,"name":"Ok"},{"fields":[{"type":3}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":0},{"name":"E","type":3}],"path":["Result"]}},{"id":5,"type":{"def":{"composite":{"fields":[{"type":6,"typeName":"[u8; 32]"}]}},"path":["ink_primitives","types","AccountId"]}},{"id":6,"type":{"def":{"array":{"len":32,"type":7}}}},{"id":7,"type":{"def":{"primitive":"u8"}}},{"id":8,"type":{"def":{"primitive":"u128"}}},{"id":9,"type":{"def":{"composite":{"fields":[{"type":6,"typeName":"[u8; 32]"}]}},"path":["ink_primitives","types","Hash"]}},{"id":10,"type":{"def":{"primitive":"u64"}}},{"id":11,"type":{"def":{"variant":{}},"path":["ink_env","types","NoChainExtension"]}}],"version":"4"}`;