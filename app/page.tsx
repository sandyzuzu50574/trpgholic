"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { playerCategories } from "./player-data";

type System = { name: string; english?: string; note: string; games: string[] };

const categories: Record<string, { intro: string; systems: System[] }> = {
  adventure: { intro: "組成隊伍、踏上旅程，在任務、選擇與挑戰裡創造故事。", systems: [
    { name: "龍與地下城 3r", english: "Dungeons & Dragons 3r", note: "經典奇幻冒險", games: ["魔女的詛咒", "聖樹夢境"] },
    { name: "龍與地下城 5e", english: "Dungeons & Dragons 5e", note: "長期戰役與單次冒險", games: ["斯特拉德的詛咒", "死亡小屋", "德魯伊的試煉：大地", "德魯伊的試煉：牧人", "逐龍的龍裔們", "羊羊快跑", "Cupid’s Sparrow", "魔女的詛咒", "勇敢的色彩", "Fowl Suitors", "碎鏡之森", "初來乍到", "失落的凡戴爾礦坑", "獸人與餅：慶生版", "命運之輪的轉動", "冬日焰火"] },
    { name: "蒼穹的紀錄", english: "Archives of the Sky", note: "史詩科幻敘事", games: ["黑鳥小姐（Lady Blackbird）"] },
    { name: "龍蛋物語", note: "溫柔的旅行奇幻", games: ["下雨的草原", "傳火之旅"] },
    { name: "QUEST", note: "輕量奇幻冒險", games: ["寶藏山", "原初之火", "濡沫淚礁", "前瞻的先知女王", "安眠遊樂場", "蔽日巨獸在呼嚕", "金鉤幫與聖誕老人", "台北大縱走", "跨年的煙火"] },
    { name: "FATE Core／快速版", note: "自由、角色導向的冒險", games: ["H×H：友客鑫拍賣會後", "獻祭吧！間諜家庭", "貓的秘密：年獸", "貓的秘密：清明", "Uder Spy"] },
    { name: "超載霓虹城", english: "Neon City Overdrive", note: "快節奏霓虹動作", games: ["Cybereat之佛跳牆"] },
    { name: "寰宇RPG", english: "Cosmere RPG", note: "寰宇世界的英雄冒險", games: ["橋九隊"] },
  ]},
  horror: { intro: "追查異常、走進黑暗，看看角色如何面對未知與恐懼。", systems: [
    { name: "克蘇魯的呼喚 7e", english: "Call of Cthulhu 7e", note: "調查、未知與宇宙恐怖", games: ["無光燈塔", "群星燃焰", "寂靜之音", "泥偶", "普洛威頓斯的陰霾", "美麗", "瑪莉", "魔鬼之子"] },
    { name: "藍鬍子的新娘", english: "Bluebeard’s Bride", note: "女性哥德恐怖", games: ["潮濕的惡意", "大紅燈籠", "愛、尊敬、服從", "死胎", "精神病院"] },
    { name: "十燭", english: "Ten Candles", note: "終將熄滅的末日恐怖", games: ["黑暗島國", "末日台北"] },
    { name: "城市之影2 快速版", english: "Urban Shadows 2e Quickstart", note: "都市奇幻與勢力角力", games: ["萬華之影一部曲：古樹", "萬華之影二部曲：國宅", "寂靜之影", "冰島之影"] },
    { name: "德古拉的新娘", english: "Brides of Dracula", note: "哥德恐怖與親密關係", games: ["無題團一", "無題團二"] },
    { name: "本週主打怪", english: "Monster of the Week", note: "怪物獵殺單元劇", games: ["支配病毒擴散", "黑水溝哥吉拉", "大稻埕迎接末日"] },
  ]},
  emotion: { intro: "把人物與關係放在故事中心，一起留下只屬於這桌的經歷。", systems: [
    { name: "夕燒小燒", english: "ゆうやけこやけ", note: "溫暖日常與小小奇蹟", games: ["狐狸與便當盒", "七五三後神的孩子", "固執爺爺與煙花", "大小姐的大冒險", "承載心意的紙飛機"] },
    { name: "我是骷髏", english: "The Skeletons", note: "記憶、時間與守候", games: ["愚人節活動", "團充合宿", "讓人困擾的哥哥", "巫女安眠之地", "無題團"] },
    { name: "怪物心2", english: "Monsterhearts 2", note: "青春、慾望與混亂關係", games: ["鬱林鎮", "楓湖鎮", "鷹棲町", "棉花糖小鎮", "冬御日町", "聖・歌爾賽特", "波上的理想鄉", "新印斯茅斯", "Ballad of the Ghost", "霍華德軍校", "佛比倫斯", "實驗高中"] },
    { name: "夜襲魔女", english: "Night Witches", note: "戰爭、姊妹情誼與代價", games: ["訓練基地"] },
    { name: "熱情如火", english: "Pasión de las Pasiones", note: "如連續劇般炙熱的情感", games: ["銀河之戀"] },
    { name: "吾生為我主", note: "選擇、身分與自我", games: ["秘辛檔案：破殼而出"] },
    { name: "武林知心", english: "Hearts of Wulin", note: "武俠、愛恨與糾葛", games: ["調虎離山", "畫坊狐影", "河洛遺毒", "如夢幻泡影", "鏡花墮天錄", "緣劫", "紅塵喜事", "幽影琉璃", "奇石現世", "邪道魔劍", "正氣飛雪", "山海泣魂"] },
    { name: "微小酒館", english: "Tiny Taverns", note: "共同經營與日常相處", games: ["拉萊耶（the克咖）", "一個半小時", "海港夜總會", "再來一位"] },
    { name: "共赴幽冥", english: "Follow Me Down", note: "愛、失去與追尋", games: ["偶像與他的貓"] },
    { name: "愛麗絲失蹤了", english: "Alice Is Missing", note: "以文字訊息尋找失蹤的朋友", games: ["固定情境"] },
    { name: "來世：遊蕩的靈魂", english: "Afterlife: Wandering Souls", note: "記憶與來世旅程", games: ["綠洲下的大水港口"] },
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

function SystemCard({ system }: { system: System }) {
  return <Sheet>
    <SheetTrigger asChild><button className="system-card" type="button">
      <span className="system-count">{system.games.length} 個劇本</span><span className="system-name">{system.name}</span>
      {system.english && <span className="system-en">{system.english}</span>}<span className="system-note">{system.note}</span>
      <span className="system-link">查看劇本 <span aria-hidden>↗</span></span>
    </button></SheetTrigger>
    <SheetContent className="w-full overflow-y-auto border-l border-slate-200 bg-white p-0 sm:max-w-xl">
      <SheetHeader className="border-b border-slate-200 px-7 py-8 pr-14 text-left"><SheetTitle className="text-2xl font-semibold tracking-tight text-slate-950">{system.name}</SheetTitle><SheetDescription className="text-base leading-7 text-slate-600">{system.note}</SheetDescription></SheetHeader>
      <div className="px-7 py-7"><p className="mb-4 text-xs font-semibold tracking-[.16em] text-slate-500">可以帶的劇本</p><div className="divide-y divide-slate-200 border-y border-slate-200">
        {system.games.map((game, index) => <article className="py-5" key={game}><div className="flex items-baseline gap-3"><span className="text-xs tabular-nums text-slate-400">{String(index + 1).padStart(2, "0")}</span><h3 className="text-base font-medium text-slate-900">《{game}》</h3></div></article>)}
      </div></div>
    </SheetContent>
  </Sheet>;
}

function Collection({ source, player = false }: { source: Record<string, { intro?: string; systems?: System[] } | Array<{ name: string; english?: string; note?: string; games: string[] }>>; player?: boolean }) {
  const tabs = [
    ["adventure", "傳統冒險"], ["horror", "恐怖調查"], ["emotion", "情感敘事"], ["party", "輕鬆派對"],
  ];
  const intros: Record<string, string> = {
    adventure: "組成隊伍、踏上旅程，在任務、選擇與挑戰裡創造故事。",
    horror: "追查異常、走進黑暗，看看角色如何面對未知與恐懼。",
    emotion: "把人物與關係放在故事中心，一起留下只屬於這桌的經歷。",
    party: "快速上手、歡樂即興，適合初次接觸、聚會或活動體驗。",
  };
  return <Tabs defaultValue="adventure" className="systems-tabs">
    <TabsList className="category-tabs" variant="line" aria-label="系統分類">
      {tabs.map(([value, label]) => <TabsTrigger key={value} value={value}>{label}</TabsTrigger>)}
    </TabsList>
    {tabs.map(([key]) => {
      const item = source[key];
      const systems: System[] = Array.isArray(item) ? item.map(system => ({ ...system, note: system.note ?? "玩家經歷" })) : item.systems ?? [];
      const intro = Array.isArray(item) ? intros[key] : item.intro ?? intros[key];
      return <TabsContent key={key} value={key} className="category-content"><p className="category-intro">{intro}</p><div className="systems-grid">{systems.map(system => <SystemCard key={`${player ? "player" : "gm"}-${system.name}`} system={system} />)}</div></TabsContent>;
    })}
  </Tabs>;
}

export default function Home() {
  return <main>
    <header className="site-header"><a className="brand" href="#top">ZUZU <span>／</span> TRPG-holic</a><nav aria-label="主要導覽"><a href="#style">GM風格</a><a href="#systems">帶過的團</a><a href="#played">跑過的團</a></nav></header>
    <section className="hero compact-hero" id="top"><h1>ZUZU<span>｜</span>TRPG-holic</h1><div className="stats" aria-label="TRPG經歷統計"><div><strong>2017</strong><span>年至今</span></div><div><strong>31</strong><span>套系統支援</span></div><div><strong>153</strong><span>團主持</span></div><div><strong>173</strong><span>團玩家</span></div></div></section>
    <section className="section split" id="style"><div><p className="section-index">01</p><h2>我的GM風格</h2></div><ol className="style-list"><li><span>01</span>理解角色，成為角色的粉絲</li><li><span>02</span>重視共同創作與交流互動</li><li><span>03</span>喜愛即興回應與關係敘事</li><li><span>04</span>玩出系統與劇本的風味</li><li><span>05</span>再加一點我們都喜歡的東西</li></ol></section>
    <details className="experience-fold" id="experience"><summary><span><small>02</small> 我曾做過</span><span className="fold-action">展開查看 ＋</span></summary><div className="experience-grid">
      <article><h3>長期戰役主持</h3><p>D&D 5e《斯特拉德的詛咒》、《命運之輪》<br />CoC 7e《寂靜之音》</p></article><article><h3>劇本撰寫</h3><p>為多種系統撰寫約30篇劇本</p></article><article><h3>系統創作</h3><p>《我們的多重宇宙》<br />《About Our Time》</p></article><article><h3>大型企劃</h3><p>愚人節系統車輪戰<br />10人《斯特拉德的詛咒》LARP<br />五桌連動《斯特拉德必須死》</p></article><article><h3>講座分享</h3><p>《VL01：活用PbtA的方法來玩各種團！》<br />《南推：如何成為一個好玩家》<br />《骰子物語：介紹夕燒小燒》</p></article>
    </div></details>
    <section className="section systems-section" id="systems"><p className="section-index">03</p><h2>帶過的團</h2><Collection source={categories} /></section>
    <section className="section systems-section" id="played"><p className="section-index">04</p><h2>跑過的團</h2><p className="collection-meta">173筆玩家團務紀錄・69套系統</p><Collection source={playerCategories} player /></section>
    <footer><span>ZUZU｜TRPG-holic</span><span>Play, talk, create.</span></footer>
  </main>;
}
