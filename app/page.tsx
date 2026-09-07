"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { playerCategories } from "./player-data";

type System = { name: string; english?: string; note: string; games: string[]; coverImage?: string };

type ScenarioDetail = { summary: string; time: string; players: string; condition?: string; coverImage?: string; externalLabel?: string; externalUrl?: string };

const scenarioDetails: Record<string, ScenarioDetail> = {
  "無光燈塔": { summary: "馬薩諸塞州愚人角外，燈塔島上的燈塔不再照亮附近危險的岩礁水域。\n\n風雨中，你們所搭乘的船觸礁即將沉沒。你們被船員送上逃生船，在風暴擴大前最好趕緊前往燈塔島。\n\n船推入黑暗翻騰的水中。能指引你們的，只有燈塔高聳輪廓下，微弱的小屋燈光。", time: "2～3 小時", players: "2～4 人", condition: "預設角卡", coverImage: "lightless-beacon-cover.webp" },
  "魔女的詛咒": { summary: "小村莊詛咒肆虐，冒險者被請求前往高塔討伐魔女。", time: "約 5 小時", players: "3～4 人", condition: "1 等冒險", coverImage: "witch-curse-cover.png", externalLabel: "PLURK", externalUrl: "https://www.plurk.com/p/mjcyrd" },
  "聖樹夢境": { summary: "聖誕節時冒險者們作了一場受祝福的夢。\n\n為了慶祝聖誕節，寫給我第一次結團的冒險者們。", time: "約 2 小時", players: "2～4 人" },
  "斯特拉德的詛咒": { summary: "迷霧壟罩，終年不見天日的巴洛維亞。\n邪惡的吸血鬼領主為追尋他命中不可得的愛慕之人，為這片土地帶來無盡的絕望。\n然而預言揭露了終將驅散迷霧的天選之人……", time: "長期戰役", players: "3～6 人", condition: "1 等開始，預計成長到 10 等", coverImage: "strahd-scenario-cover.webp" },
  "死亡小屋": { summary: "誤入迷霧的冒險者們，面臨死亡的威脅，躲進了荒野中遭棄置的宅邸。", time: "約 6 小時", players: "3～6 人", condition: "2 等冒險" },
  "德魯伊的試煉：大地": { summary: "小小德魯伊踏上試煉，要證明自己能獨當一面。\n\n為玩家設計的角色前傳。", time: "2～3 小時", players: "2 人", condition: "1 等冒險" },
  "德魯伊的試煉：牧人": { summary: "小小德魯伊踏上試煉，要證明自己能獨當一面。\n\n為玩家設計的角色前傳。", time: "2～3 小時", players: "1 人", condition: "1 等冒險" },
  "逐龍的龍裔們": { summary: "追尋龍的線索來到山城的龍裔們，遇上了危機。\n\n為玩家設計的角色前傳。", time: "2～3 小時", players: "3 人", condition: "1 等冒險" },
  "羊羊快跑": { summary: "有隻羊咩咩叼著卷軸找上你們！", time: "約 4 小時", players: "2～4 人", condition: "5 等冒險", coverImage: "wild-sheep-chase-cover.webp" },
  "邱比特的麻雀": { summary: "情人節特別篇。\n你們來到正為愛與美的女神淑妮舉辦慶典的小鎮。", time: "約 4 小時", players: "2 人", condition: "等級不拘", coverImage: "cupid-sparrow-cover.webp" },
  "勇敢的色彩": { summary: "收錄於《公主計畫》的小短篇。\n\n當奪心魔的入侵威脅到幽暗地域中的呋嚕王國時，呋嚕公主呼嚕花拉嚕違背父親的期待，前往地面世界尋求幫助。冒險者們能穿越幽暗地域的危險，避開奪心魔的突襲，拯救呋嚕王國嗎？", time: "4～5 小時", players: "3～4 人", condition: "5 等冒險" },
  "追鵝人": { summary: "收錄於《公主計畫》的小短篇。\n\n瓦基歐公爵很煩惱。他很快就要退休了，但他的女兒克勞迪特一直在逃避責任；宮廷法師未經通知就離開了，新的朝臣不斷來訪，以獲得青睞和權力。\n\n近期有一場盛宴要準備，而且，彷彿一切還不夠似的，有隻天鵝一直在威脅著這座豪宅。", time: "約 6 小時", players: "2～4 人", condition: "3 等冒險" },
  "碎鏡之森": { summary: "神秘的委託人請求冒險者將聖物送進碎鏡之森的遺跡裡。", time: "4～5 小時", players: "2～4 人", condition: "3 等冒險" },
  "初來乍到": { summary: "鄰國的冬至慶典將臨，你的家人已經先一步前往，而你作為年輕的貴族，在完成你的日常修業後，也要踏上傳送陣前往參加。\n\n適合第一次接觸 TRPG 的玩家。", time: "3 小時", players: "1 人", condition: "1 等冒險", coverImage: "first-arrival-cover.jpg" },
  "失落的凡戴爾礦坑": { summary: "五百年前，侏儒與矮人氏族簽訂了「凡達林協定」，共同開發富含強大魔法力量的「潮音洞穴」。\n\n後來因獸人侵襲，這座神奇的礦坑連同裡面的財寶神祕失落。\n\n如今，英雄們受託護送貨物前往邊境小鎮「凡達林」，卻意外捲入尋找失落礦坑的陰謀與地方惡霸的威脅之中。", time: "短戰役", players: "4～5 人", condition: "1 等冒險", coverImage: "lost-mine-cover.jpg" },
  "獸人與餅：慶生版": { summary: "獸人與餅，但有人生日。\n\n為朋友慶生寫的小劇本。", time: "2 小時", players: "2～4 人", condition: "1 等冒險" },
  "命運之輪的轉動": { summary: "冒險者們在萬門之城——法印城的停屍間中醒來。\n\n糟糕的是，你們失去了所有的記憶，甚至發現自己的靈魂與身體出了一些「差錯」。\n\n多重宇宙出現了錯誤，這次的敵人是存在危機！", time: "長戰役", players: "2～4 人", condition: "1 等開始，預計成長到 18 等", coverImage: "turn-of-fortunes-wheel-cover.jpg" },
  "冬日焰火": { summary: "楚爾特仲冬節將至，重要物資與彭貝隆果實離奇失蹤，慶典陷入災難危機，冒險者需趕在混亂擴大前找出真相。", time: "2～3 小時", players: "2～4 人", condition: "3 等冒險" },
};

function GameRecord({ game, index }: { game: string; index: number }) {
  const detail = scenarioDetails[game];
  const heading = <div className="game-row"><span>{String(index + 1).padStart(2, "0")}</span><h3>《{game}》</h3>{detail && <span className="game-expand-label">展開介紹 ＋</span>}</div>;
  if (!detail) return <article className="game-record-static">{heading}</article>;
  return <details className="game-record"><summary>{heading}</summary><div className="game-detail-card">
    {detail.coverImage ? <img className="game-cover-image" src={detail.coverImage} alt={`《${game}》劇本封面`} /> : <div className="game-cover-placeholder" role="img" aria-label={`《${game}》劇本封面預留位置`}><span>SCENARIO COVER</span><strong>{game}</strong><small>封面待補</small></div>}
    <div className="game-detail-copy"><p className="game-detail-label">劇本簡介</p><p>{detail.summary}</p><div className="game-meta"><span>{detail.time}</span><span>{detail.players}</span>{detail.condition && <span>{detail.condition}</span>}</div>{detail.externalUrl ? <a className="game-blog-link" href={detail.externalUrl} target="_blank" rel="noreferrer"><span>閱讀相關貼文</span><small>{detail.externalLabel ?? "LINK"} ↗</small></a> : <div className="game-blog-placeholder"><span>BLOG 團錄／心得</span><small>連結待補</small></div>}</div>
  </div></details>;
}

const categories: Record<string, { intro: string; systems: System[] }> = {
  adventure: { intro: "組成隊伍、踏上旅程，在任務、選擇與挑戰裡創造故事。", systems: [
    { name: "龍與地下城 3r", english: "Dungeons & Dragons 3r", note: "經典奇幻冒險", games: ["魔女的詛咒", "聖樹夢境"], coverImage: "dnd-35-players-handbook.png" },
    { name: "龍與地下城 5e", english: "Dungeons & Dragons 5e", note: "長期戰役與單次冒險", games: ["斯特拉德的詛咒", "死亡小屋", "德魯伊的試煉：大地", "德魯伊的試煉：牧人", "逐龍的龍裔們", "羊羊快跑", "邱比特的麻雀", "魔女的詛咒", "勇敢的色彩", "追鵝人", "碎鏡之森", "初來乍到", "失落的凡戴爾礦坑", "獸人與餅：慶生版", "命運之輪的轉動", "冬日焰火"], coverImage: "dnd-5e-cover.webp" },
    { name: "蒼穹的紀錄", english: "Archives of the Sky", note: "史詩科幻敘事", games: ["黑鳥小姐（Lady Blackbird）"], coverImage: "lady-blackbird-cover.webp" },
    { name: "龍蛋物語", note: "溫柔的旅行奇幻", games: ["下雨的草原", "傳火之旅"], coverImage: "ryuutama-rulebook.jpg" },
    { name: "QUEST", note: "輕量奇幻冒險", games: ["寶藏山", "原初之火", "濡沫淚礁", "前瞻的先知女王", "安眠遊樂場", "蔽日巨獸在呼嚕", "金鉤幫與聖誕老人", "台北大縱走", "跨年的煙火"], coverImage: "quest-rpg-cover.jpg" },
    { name: "FATE Core／快速版", note: "自由、角色導向的冒險", games: ["H×H：友客鑫拍賣會後", "獻祭吧！間諜家庭", "貓的秘密：年獸", "貓的秘密：清明", "Uder Spy"], coverImage: "fate-core-cover.png" },
    { name: "超載霓虹城", english: "Neon City Overdrive", note: "賽博龐克的任務", games: ["Cybereat之佛跳牆"], coverImage: "neon-city-overdrive-cover.webp" },
    { name: "寰宇RPG", english: "Cosmere RPG", note: "寰宇世界的英雄冒險", games: ["橋九隊"], coverImage: "cosmere-rpg-cover.webp" },
  ]},
  horror: { intro: "追查異常、走進黑暗，看看角色如何面對未知與恐懼。", systems: [
    { name: "克蘇魯的呼喚 7e", english: "Call of Cthulhu 7e", note: "調查、未知與宇宙恐怖", games: ["無光燈塔", "群星燃焰", "寂靜之音", "泥偶", "普洛威頓斯的陰霾", "美麗", "瑪莉", "魔鬼之子"], coverImage: "coc-7e-cover.webp" },
    { name: "藍鬍子的新娘", english: "Bluebeard’s Bride", note: "女性哥德恐怖", games: ["潮濕的惡意", "大紅燈籠", "愛、尊敬、服從", "死胎", "精神病院"], coverImage: "bluebeards-bride-cover.png" },
    { name: "十燭", english: "Ten Candles", note: "終將熄滅的末日恐怖", games: ["黑暗島國", "末日台北"], coverImage: "ten-candles-cover.webp" },
    { name: "德古拉的新娘", english: "Brides of Dracula", note: "哥德恐怖與親密關係", games: ["無題團一", "無題團二"], coverImage: "brides-of-dracula-cover.webp" },
    { name: "本週主打怪", english: "Monster of the Week", note: "怪物獵殺單元劇", games: ["支配病毒擴散", "黑水溝哥吉拉", "大稻埕迎接末日"], coverImage: "monster-of-the-week-cover.webp" },
  ]},
  emotion: { intro: "把人物與關係放在故事中心，一起留下只屬於這桌的經歷。", systems: [
    { name: "城市之影2 快速版", english: "Urban Shadows 2e Quickstart", note: "都市奇幻與勢力角力", games: ["萬華之影一部曲：古樹", "萬華之影二部曲：國宅", "寂靜之影", "冰島之影"], coverImage: "urban-shadows-2e-user-cover.png" },
    { name: "夕燒小燒", english: "ゆうやけこやけ", note: "溫暖日常與小小奇蹟", games: ["狐狸與便當盒", "七五三後神的孩子", "固執爺爺與煙花", "大小姐的大冒險", "承載心意的紙飛機"], coverImage: "yuuyake-koyake-cover.png" },
    { name: "我是骷髏", english: "The Skeletons", note: "記憶、時間與守候", games: ["愚人節活動", "團充合宿", "讓人困擾的哥哥", "巫女安眠之地", "無題團"], coverImage: "the-skeletons-cover.png" },
    { name: "怪物心2", english: "Monsterhearts 2", note: "青春、慾望與混亂關係", games: ["鬱林鎮", "楓湖鎮", "鷹棲町", "棉花糖小鎮", "冬御日町", "聖・歌爾賽特", "波上的理想鄉", "新印斯茅斯", "Ballad of the Ghost", "霍華德軍校", "佛比倫斯", "實驗高中"], coverImage: "monsterhearts-2-cover.png" },
    { name: "夜襲魔女", english: "Night Witches", note: "戰爭、姊妹情誼與代價", games: ["訓練基地"], coverImage: "night-witches-cover.png" },
    { name: "熱情如火", english: "Pasión de las Pasiones", note: "如連續劇般炙熱的情感", games: ["銀河之戀"], coverImage: "pasion-de-las-pasiones-cover.png" },
    { name: "吾生為吾主", note: "選擇、身分與自我", games: ["秘辛檔案：破殼而出"], coverImage: "my-life-with-master-cover.png" },
    { name: "武林知心", english: "Hearts of Wulin", note: "武俠、愛恨與糾葛", games: ["調虎離山", "畫坊狐影", "河洛遺毒", "如夢幻泡影", "鏡花墮天錄", "緣劫", "紅塵喜事", "幽影琉璃", "奇石現世", "邪道魔劍", "正氣飛雪", "山海泣魂"], coverImage: "hearts-of-wulin-cover.png" },
    { name: "微小酒館", english: "Tiny Taverns", note: "共同經營與日常相處", games: ["拉萊耶（the克咖）", "一個半小時", "海港夜總會", "再來一位"], coverImage: "tiny-taverns-cover.png" },
    { name: "共赴幽冥", english: "Follow Me Down", note: "愛、失去與追尋", games: ["偶像與他的貓"], coverImage: "follow-me-down-cover.png" },
    { name: "愛麗絲失蹤了", english: "Alice Is Missing", note: "以文字訊息尋找失蹤的朋友", games: ["固定情境"], coverImage: "alice-is-missing-cover.png" },
    { name: "來世：遊蕩的靈魂", english: "Afterlife: Wandering Souls", note: "記憶與來世旅程", games: ["綠洲下的大水港口"], coverImage: "afterlife-wandering-souls-cover.png" },
  ]},
  party: { intro: "快速上手、歡樂即興，適合初次接觸、聚會或活動體驗。", systems: [
    { name: "女巫已死", note: "動物使魔的復仇小品", games: ["無題團"] },
    { name: "磁鐵手博士", english: "Doctor Magnethands", note: "荒謬即興冒險", games: ["無題團"] },
    { name: "人人都是約翰", english: "Everyone Is John", note: "混亂多人喜劇", games: ["無題團"] },
    { name: "觀葉植物TRPG", note: "成為一盆觀葉植物", games: ["無題團"] },
    { name: "哥布林跑跑腿", english: "Goblin Errands", note: "哥布林的麻煩差事", games: ["聖誕烤雞HOHOHO"] },
    { name: "我們的多重宇宙", english: "Our Multiverse v1.43", note: "2–4人自創迷你TRPG", games: ["美食生死鬥", "異世界穿越到現實", "怪盜任務", "霍格華茲入學考", "我們的水母宇宙", "魔法市集"] },
  ]},
};

function SystemCard({ system, player = false }: { system: System; player?: boolean }) {
  return <Sheet>
    <SheetTrigger asChild><button className={`system-card${player ? " player-card" : ""}${system.coverImage ? " has-system-cover" : ""}`} type="button">
      {system.coverImage && <img className="system-cover-art" src={system.coverImage} alt="" aria-hidden="true" />}
      <span className="system-count">{system.games.length} 個劇本</span><span className="system-name">{system.name}</span>
      {system.english && <span className="system-en">{system.english}</span>}{!player && <span className="system-note">{system.note}</span>}
      <span className="system-link">查看劇本 <span aria-hidden>↗</span></span>
    </button></SheetTrigger>
    <SheetContent className="w-full overflow-y-auto border-l border-slate-200 bg-white p-0 sm:max-w-xl">
      <SheetHeader className="border-b border-slate-200 px-7 py-8 pr-14 text-left"><SheetTitle className="text-2xl font-semibold tracking-tight text-slate-950">{system.name}</SheetTitle>{!player && <SheetDescription className="text-base leading-7 text-slate-600">{system.note}</SheetDescription>}</SheetHeader>
      <div className="px-7 py-7"><p className="mb-4 text-xs font-semibold tracking-[.16em] text-slate-500">劇本紀錄</p><div className="game-records">
        {system.games.map((game, index) => <GameRecord game={game} index={index} key={game} />)}
      </div></div>
    </SheetContent>
  </Sheet>;
}

function Collection({ source, player = false }: { source: Record<string, { intro?: string; systems?: System[] } | Array<{ name: string; english?: string; note?: string; games: string[] }>>; player?: boolean }) {
  const tabs = [
    ["adventure", "奇幻冒險"], ["horror", "探索恐怖"], ["emotion", "情感敘事"], ["party", "輕鬆派對"],
  ];
  return <Tabs defaultValue="adventure" className="systems-tabs">
    <TabsList className="category-tabs" variant="line" aria-label="系統分類">
      {tabs.map(([value, label]) => <TabsTrigger key={value} value={value}>{label}</TabsTrigger>)}
    </TabsList>
    {tabs.map(([key]) => {
      const item = source[key];
      const systems: System[] = Array.isArray(item) ? item.map(system => ({ ...system, note: system.note ?? "玩家經歷" })) : item.systems ?? [];
      return <TabsContent key={key} value={key} className="category-content"><div className="systems-grid">{systems.map(system => <SystemCard key={`${player ? "player" : "gm"}-${system.name}`} system={system} player={player} />)}</div></TabsContent>;
    })}
  </Tabs>;
}

export default function Home() {
  return <main>
    <iframe src="tabletop.html" title="ZUZU｜TRPG-holic 互動擲骰桌面" style={{ display: "block", width: "100%", height: "100svh", minHeight: "560px", border: 0 }} />
    <div className="zuzu-pop-in" aria-hidden="true">
      <img src="zuzu-cheers-cutout.png" alt="" />
    </div>
    <header className="site-header"><a className="brand" href="#top">ZUZU <span>／</span> TRPG-holic</a><nav aria-label="主要導覽"><a href="#style">我喜歡！</a><a href="#experience">我做過！</a><a href="#systems">帶過的團</a><a href="#played">跑過的團</a></nav><details className="mobile-nav"><summary aria-label="開啟導覽選單"><span></span><span></span></summary><div>{[["#style","我喜歡！"],["#experience","我做過！"],["#systems","帶過的團"],["#played","跑過的團"]].map(([href,label]) => <a href={href} key={href} onClick={event => { const menu = event.currentTarget.closest("details"); if (menu) menu.open = false; }}>{label}</a>)}</div></details></header>
    <section className="hero compact-hero" id="top"><h1>ZUZU<span>｜</span>TRPG-holic</h1><div className="stats" aria-label="TRPG經歷統計"><div><strong>2017</strong><span>年至今</span></div><div><strong>31</strong><span>套系統支援</span></div><div><strong>153</strong><span>團主持</span></div><div><strong>173</strong><span>團玩家</span></div></div></section>
    <details className="style-fold" id="style"><summary><span className="fold-title"><small>01</small> 我喜歡！</span><span className="fold-action">展開查看 ＋</span></summary><ol className="style-list"><li>理解角色，成為角色的粉絲</li><li>重視共同創作與交流互動</li><li>喜愛即興回應與關係敘事</li><li>玩出系統與劇本的風味</li><li>再加一點我們都喜歡的東西</li></ol></details>
    <details className="experience-fold" id="experience"><summary><span className="fold-title"><small>02</small> 我做過！</span><span className="fold-action">展開查看 ＋</span></summary><div className="experience-grid">
      <article><h3>長期戰役主持</h3><p>D&D 5e《斯特拉德的詛咒》、《命運之輪》<br />CoC 7e《寂靜之音》</p></article><article><h3>劇本撰寫</h3><p>為多種系統撰寫約30篇劇本</p></article><article><h3>系統創作</h3><p>《我們的多重宇宙》<br />《About Our Time》</p></article><article><h3>大型企劃</h3><p>愚人節系統車輪戰<br />10人《斯特拉德的詛咒》LARP<br />五桌連動《斯特拉德必須死》</p></article><article><h3>推廣與活動</h3><p>於各地推廣會及大型活動擔任 GM</p></article><article><h3>講座分享</h3><p>《VL01：活用PbtA的方法來玩各種團！》<br />《南推：如何成為一個好玩家》<br />《骰子物語：介紹夕燒小燒》</p></article>
    </div></details>
    <section className="section systems-section" id="systems"><p className="section-index">03</p><h2>帶過的團</h2><Collection source={categories} /></section>
    <section className="section systems-section" id="played"><p className="section-index">04</p><h2>跑過的團</h2><Collection source={playerCategories} player /></section>
    <footer><span>ZUZU｜TRPG-holic</span><span>Play, talk, create.</span></footer>
  </main>;
}
