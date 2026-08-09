import type { MediaKey } from "@/content/media";
import type { Localized } from "@/lib/i18n";

export type ArticleSection = {
  heading?: Localized<string>;
  paragraphs: Localized<string>[];
};

export type CrownArticle = {
  slug: string;
  title: Localized<string>;
  author: Localized<string>;
  date: string; // ISO date
  displayDate: Localized<string>;
  readingTime: Localized<string>;
  excerpt: Localized<string>;
  image?: MediaKey;
  sourceUrl: string;
  sections: ArticleSection[];
};

// External blog kept as a link card (not migrated in full).
export const externalBlogs: { title: Localized<string>; url: string }[] = [
  {
    title: { zh: "溫英幹教授部落格", en: "Professor Ying-Gan Wen's Blog" },
    url: "http://ykwen.blogspot.com/",
  },
];

export const crownArticles: CrownArticle[] = [
  {
    slug: "reversing-financial-destiny",
    title: {
      zh: "如何反轉「財務命運」？",
      en: "How Can We Reverse Our “Financial Destiny”?",
    },
    author: { zh: "邱燕惠", en: "Olive Chiu" },
    date: "2020-09-13",
    displayDate: { zh: "2020 年 9 月 13 日", en: "September 13, 2020" },
    readingTime: { zh: "約 7 分鐘", en: "7 min read" },
    excerpt: {
      zh: "從校園團契的代禱事項談起，看見思維如何影響財務命運，並學習以聖經真理成為忠心、良善、有見識的管家。",
      en: "Starting from the prayer requests of a campus fellowship, we see how our thinking shapes our financial destiny, and learn from Scripture to become faithful, good, and wise stewards.",
    },
    image: "crownArticleFinancialDestiny",
    sourceUrl: "https://www.crown-nac.org/blog",
    sections: [
      {
        heading: { zh: "與財務脫不了關係的困擾", en: "Troubles Inseparable from Money" },
        paragraphs: [
          {
            zh: "最近，團契群中發了一則求救消息：有位博士生的室友拖欠數月房租，博士生在與室友溝通時被其打傷，找了警察卻不了了之。博士生鼻骨裂傷，雙眼淤青，面部腫大。時值紐約疫情嚴重期間，醫生沒有開止痛消炎藥，目前他在經濟和身體上都挺受傷。在疫情中，這種事該如何處理呢？",
            en: "Recently a cry for help was posted in our fellowship group: a doctoral student's roommate had failed to pay several months of rent, and when the student tried to talk it out he was beaten. The police were called but nothing came of it. The student suffered a fractured nose, bruised eyes, and a swollen face. It was the height of the New York pandemic, and the doctor prescribed no painkillers or anti-inflammatories; he was hurting both financially and physically. In the middle of a pandemic, how should such a thing be handled?",
          },
          {
            zh: "在校園團契禱告會中，我們常聽到學生們這樣禱告：「唉！H1B 沒抽到，真要哭了，都第三次了……」「畢業後我想回國，可是考慮……」「我們計劃一畢業就結婚，但是在身份問題和工作沒有著落前，我們雙方父母不同意……」「我爸媽會支持我畢業後的經濟問題，條件是他們希望我留在美國……」「眼看 OPT 快到期了，而我的工作還沒著落……」「昨天在網上看到 X 牌打一折，機會難得買了一件外套，只是這下我要為節制禱告了……」「最近壓力很大，報告要交，還和男友因為信仰和生日禮物的事情吵架……」",
            en: "In campus fellowship prayer meetings we often hear students pray like this: “Ugh, I didn't get picked in the H1B lottery—I could cry, this is the third time...” “I want to go home after graduation, but I'm weighing...” “We planned to marry right after graduation, but until the visa status and jobs are settled, both sets of parents object...” “My parents will help with my finances after graduation—on the condition that I stay in the U.S....” “My OPT is about to expire and I still have no job lined up...” “Yesterday I saw brand X at 90% off online—a rare chance—so I bought a coat, but now I need to pray for self-control...” “I'm under a lot of pressure lately: papers due, and I quarreled with my boyfriend over faith and a birthday gift...”",
          },
          {
            zh: "這些代禱內容，都與財務有關！",
            en: "Every one of these prayer requests is connected to money.",
          },
        ],
      },
      {
        heading: { zh: "思維影響財務", en: "Our Thinking Shapes Our Finances" },
        paragraphs: [
          {
            zh: "首先，我們要區分何謂一般人追求的財富自由，以及何謂基於真理的財務自由。一般人追求的財富自由，僅限於今生可以追求並可能得到的財富。從這個觀點出發，我們可以追問：需要多少儲蓄才能滿足安全感？所獲財富能持續幾代人？若能成為企業巨人便是攀登至人生頂峰了嗎？追求利益的目的是什麼？如何在財務自由上擁有財富，而不會變成守財奴？",
            en: "First we must distinguish the “financial independence” most people pursue from the financial freedom that is grounded in truth. The financial independence most people seek is limited to wealth that can be pursued and possibly obtained in this life. From that vantage point we might ask: How much savings is enough to feel secure? How many generations will the wealth last? If you become an industry giant, have you reached the peak of life? What is the purpose of pursuing profit? How can you hold wealth in financial freedom without becoming a miser?",
          },
          {
            zh: "基於真理的財務自由，則是基督徒踐行上帝管家使命所衍生的財務觀：以上帝的話為根基，以愛上帝愛人為動機，以聖靈的管理為行動。至於生活的安全感，則是基於上帝的應許！因為我們已經有一個真正安全且永恆的財富。",
            en: "Financial freedom grounded in truth, by contrast, is the financial outlook that flows from a Christian living out God's call to stewardship: founded on God's Word, motivated by love for God and neighbor, and carried out under the Holy Spirit's management. As for security in life, it rests on God's promises—for we already possess a truly secure and eternal treasure.",
          },
          {
            zh: "以下這條公式可以作為參考，明白一個人的思維如何影響他的財務命運：思維 → 帶出財務行為 → 養成財務習慣 → 形成財務性格 → 財務命運。無論哪個時代，面對金錢的真正困境都存在於看不見的潛在危機中。這危機是因為罪性，我們產生以自我為中心的錯誤思維，並從錯誤思維導致錯誤選擇，最終經歷悲催的財務故事。人若在財務管理的過程中意圖不軌，則或因貪婪而成為金錢的奴隸；或因驕傲爭競、渴望權力大如上帝；或是陷入試探，落在無盡的勞苦愁煩中。",
            en: "The following chain can help us see how a person's thinking shapes his financial destiny: thinking → produces financial behavior → forms financial habits → shapes financial character → financial destiny. In every age, the real danger with money lies in an unseen, latent crisis. That crisis arises from our sinful nature: we generate self-centered, mistaken thinking, and from mistaken thinking come wrong choices, ending in a sorry financial story. When a person's intentions go astray in managing money, he may become a slave to money through greed; or, through pride and rivalry, crave power as great as God's; or fall into temptation and endless toil and sorrow.",
          },
        ],
      },
      {
        heading: { zh: "聖經中的財務觀", en: "A Biblical View of Money" },
        paragraphs: [
          {
            zh: "聖經中有許多處經文談到金錢，在耶穌的比喻中，有十六個是與財務有關的！耶穌在對門徒的「天國憲章」講論中教導說：「要積攢財寶在天上……因為你的財寶在哪裡，你的心也在那裡……一個人不能侍奉兩個主。不是惡這個愛那個，就是重這個輕那個。你們不能又侍奉上帝，又侍奉瑪門。」（參《馬太福音》6:20-24）",
            en: "Scripture speaks about money in many places—and sixteen of Jesus' parables touch on finances. In His “charter of the kingdom” teaching to the disciples, Jesus said: “Store up for yourselves treasures in heaven... For where your treasure is, there your heart will be also... No one can serve two masters... You cannot serve both God and money (mammon).” (see Matthew 6:20-24)",
          },
          {
            zh: "這世界的經濟系統與上帝的經濟系統不同，永活的上帝擁有並主宰一切，祂的意念與道路才是我們永恆不變的核心價值。因此，基督徒需要學習如何以聖經的觀念，管理上帝所交付我們的財富，這就是管家神學。而如何理財便反映了我們與上帝的關係！這世界的開始，伊甸園的所有權是上帝的，祂賦予人管理的責任，並賞賜人享受園中一切的豐盛。然而卻因為人的貪婪，自以為可以搶奪上帝的主權，這愚昧的選擇便帶來罪的結果——被逐出上帝的同在與豐富！",
            en: "This world's economic system differs from God's. The living God owns and rules over everything; His thoughts and His ways are our unchanging, eternal core values. Christians therefore need to learn to manage the wealth God entrusts to us according to biblical understanding—this is the theology of stewardship. And how we handle money reflects our relationship with God. At the world's beginning, the Garden of Eden belonged to God; He gave humanity the responsibility to manage it and the gift of enjoying all its abundance. Yet through human greed—imagining we could seize God's sovereignty—that foolish choice brought the consequence of sin: expulsion from God's presence and abundance.",
          },
          {
            zh: "如何有智慧地管理上帝交付我們的錢，是我們每日要面對的。忠心管家需要遵行兩大原則：愛上帝和愛人。愛上帝，就是敬畏上帝（參《申命記》6:24）；愛人，則是「你們願意人怎樣待你們，你們也要怎樣待人」（參《馬太福音》7:12）。",
            en: "How to manage wisely the money God entrusts to us is something we face daily. A faithful steward follows two great principles: love God and love people. To love God is to fear God (see Deuteronomy 6:24); to love people is to “do to others what you would have them do to you” (see Matthew 7:12).",
          },
        ],
      },
      {
        heading: { zh: "檢視財務行為", en: "Examining Our Financial Behavior" },
        paragraphs: [
          {
            zh: "作為上帝的管家，首先要存謙卑感恩的心，承認財富都是上帝託付的。幾千年前，摩西對以色列的先祖提到：「你要記念耶和華你的上帝，因為得貨財的力量是他給你的，為要堅定他向你列祖起誓所立的約，像今日一樣。」（《申命記》8:18）",
            en: "As God's stewards, we begin with a humble and grateful heart, acknowledging that all wealth is entrusted by God. Thousands of years ago Moses reminded Israel's ancestors: “Remember the Lord your God, for it is He who gives you the ability to produce wealth, and so confirms His covenant, which He swore to your ancestors, as it is today.” (Deuteronomy 8:18)",
          },
          {
            zh: "如何檢視自己的財務行為，以下幾個建議也許可以幫我們對照內心：在賺錢的機會上，無論是實習、工作、兼職經營電子商務、投資等，都要時時省察自己是否誠實？有否貪財？購物是否出於需要，還是被人誘惑或與人攀比？消費是否與自己的經濟能力相平衡？買車或婚禮的規模，是否因為慾望或試探，以借貸甚至網貸來滿足消費慾望？行為是否心中有平安對應？在別人的缺乏上有沒有愛心的幫助？",
            en: "To examine our own financial behavior, the following questions may help us search our hearts: In opportunities to earn—internships, jobs, side businesses in e-commerce, investments—are we honest? Are we greedy for money? Do we buy out of genuine need, or because we are enticed or comparing ourselves with others? Is our spending balanced with our means? Are the scale of a car purchase or a wedding driven by desire or temptation, financed by loans or even online lending to satisfy our cravings? Is there inner peace that matches our conduct? And do we help others in their need out of love?",
          },
          {
            zh: "我們把凡事帶到上帝面前，因為相信上帝是可信賴的供應者，祂知道我們的需要和軟弱；我們求聖靈管理每一筆財務的運用，因為我們是上帝的管家。",
            en: "We bring everything to God, trusting Him as our faithful Provider who knows our needs and weaknesses; and we ask the Holy Spirit to govern the use of every dollar, because we are God's stewards.",
          },
        ],
      },
      {
        heading: { zh: "培養財務習慣", en: "Cultivating Financial Habits" },
        paragraphs: [
          {
            zh: "突如其來的一場瘟疫，揭示了人是如何以私慾、無知、傲慢引發了世界性的災難。因為疫情，北美的許多中國留學生，有回不來的，也有回不去的，對未知的恐懼產生許多負面情緒。因學費、生活費負擔的可能增加，再加上學校改為網絡授課，是否要回國呢？可面對昂貴、一票難求且不確定的航班，糾結啊！",
            en: "A sudden pandemic exposed how human selfishness, ignorance, and arrogance can trigger a worldwide disaster. Because of it, many Chinese students in North America could neither return nor go home, and fear of the unknown stirred up many negative emotions. With tuition and living costs possibly rising, and classes moved online, should they go home? Yet facing expensive, scarce, and uncertain flights—what a dilemma!",
          },
          {
            zh: "不僅是疫情造成的影響，還有原生家庭給予的金錢觀、文化風俗傳統、教育背景、政治環境、網絡的方便性、交通的便捷、科技的研發、產業的升級、創意的自由風氣、廣告營銷的感染力、投資和支付方式的多元性、虛擬貨幣的興起……快速又無形地影響著我們的財務習慣。",
            en: "It is not only the pandemic that shapes us, but also the money attitudes handed down by our families of origin, cultural customs and traditions, educational background, the political environment, the convenience of the internet, easy transportation, technological development, industrial upgrading, the free spirit of creativity, the persuasive power of advertising, the many forms of investing and payment, the rise of cryptocurrency—all of these swiftly and invisibly shape our financial habits.",
          },
          {
            zh: "耶穌說，我們在世上有苦難（參《約翰福音》16:33）。基督信仰並沒有承諾我們天色常藍花香常漫。學習做財務規劃是忠心管家應盡的責任，如此在面對不時之需時，財務仍然是自由的。以上帝為中心的財務習慣，首先是把當納的十一奉獻歸給上帝，其他的除了預留基本生活費，還要擬定還款計劃、意外基金儲蓄、不受貪欲主導的投資、旅行學習基金、愛心捐款等。如聖經所說：「當將你的糧食撒在水面，因為日久必能得著。你要分給七人，或分給八人，因為你不知道將來有什麼災禍臨到地上。」（《傳道書》11:1-2）",
            en: "Jesus said we will have trouble in this world (see John 16:33). The Christian faith never promises perpetual blue skies and blooming flowers. Learning to plan financially is a faithful steward's duty, so that when unexpected needs arise our finances remain free. God-centered financial habits begin by giving God the tithe that is due; beyond setting aside basic living costs, we also make a debt-repayment plan, build an emergency fund, invest without being ruled by greed, save for travel and learning, and give generously. As Scripture says: “Ship your grain across the sea; after many days you may receive a return. Invest in seven ventures, yes, in eight; you do not know what disaster may come upon the land.” (Ecclesiastes 11:1-2)",
          },
          {
            zh: "此外，對於生活費用、奢侈品購買，要先考慮性價比；投資前要有全面的諮詢。養成規律健康的生活習慣是討上帝喜悅的，縱然是居家隔離期間也要持續，健康的身心靈是寶貴的財富。",
            en: "In addition, weigh value for money on living expenses and luxury purchases, and seek thorough counsel before investing. Building regular, healthy habits of life pleases God—maintain them even during quarantine—for a healthy body, mind, and spirit are precious wealth.",
          },
        ],
      },
      {
        heading: { zh: "塑造財務品格", en: "Shaping Financial Character" },
        paragraphs: [
          {
            zh: "不可否認，財務能鍛煉一個人的靈命和品格。錢財，既能攔阻我們過一個以基督為中心的人生，也能塑造我們的品格。擁有合乎聖經的理財觀，可以提醒並挑戰我們在實際生活中，是否在錢財上敬畏上帝又愛人如己。",
            en: "There is no denying that finances train a person's spiritual life and character. Money can both hinder us from a Christ-centered life and shape our character. A biblical view of finances reminds and challenges us whether, in real life, we fear God and love our neighbor as ourselves in the way we handle money.",
          },
          {
            zh: "如今，人們可以超越國界，甚至無須攜帶紙幣出門。網絡的便捷不但開啟了各種信息收集的方便門，也增加了更多的消費方式，帶來更多形式的誘惑與陷阱。作為基督徒，我們需要時刻提醒自己，在這個瞬息萬變的世界，只有「耶穌基督昨日今日一直到永遠，是一樣的。你們不要被那諸般怪異的教訓勾引了去。因為人心靠恩得堅固才是好的，並不是靠飲食；那在飲食上專心的，從來沒有得著益處。」（《希伯來書》13:8-9）",
            en: "Today people can cross borders and even leave home without carrying cash. The convenience of the internet opens the door to all kinds of information, but it also multiplies ways to spend and forms of temptation and traps. As Christians we must constantly remind ourselves that in this ever-changing world, only “Jesus Christ is the same yesterday and today and forever. Do not be carried away by all kinds of strange teachings. It is good for our hearts to be strengthened by grace, not by ceremonial foods, which are of no value to those who eat them.” (Hebrews 13:8-9)",
          },
          {
            zh: "一個愛上帝愛人、屬上帝的管家，是時時向上帝禱告的：「我求你兩件事，在我未死之先，不要不賜給我：求你使虛假和謊言遠離我；使我也不貧窮也不富足，賜給我需用的飲食，恐怕我飽足不認你，說：耶和華是誰呢？又恐怕我貧窮就偷竊，以致褻瀆我上帝的名。」（《箴言》30:7-9）我們只有持守聖經真理，願意在基督十架裡塑造品格，才能在變動的時代環境中自我校正。",
            en: "A God-belonging steward who loves God and people prays constantly: “Two things I ask of you, Lord; do not refuse me before I die: Keep falsehood and lies far from me; give me neither poverty nor riches, but give me only my daily bread. Otherwise, I may have too much and disown you and say, ‘Who is the Lord?’ Or I may become poor and steal, and so dishonor the name of my God.” (Proverbs 30:7-9) Only by holding to biblical truth and being willing to have our character shaped at the cross of Christ can we keep correcting our course in a changing age.",
          },
        ],
      },
      {
        heading: { zh: "理財要先理心", en: "Managing Money Begins with Managing the Heart" },
        paragraphs: [
          {
            zh: "耶穌曾教導說，一天的難處一天當，不要為明天憂慮吃什麼、喝什麼、穿什麼……（參《馬太福音》6:31-34）這樣說來，我們的日子只有兩天，「今天」和「那一天」。那一天，指的是生命氣息停止、不再需要財務行為的日子；也可以指我們面對最後審判的日子。為了那一天，讓我們在每個今天，在財務上對上帝盡忠，對人誠實有愛心。事實上，今天每一個與財務有關的行為，無論是賺取、奉獻、使用、儲存、投資，都反映了我們與上帝的關係，永恆是如此真實且與今天息息相關。",
            en: "Jesus taught that each day has enough trouble of its own, and not to worry about tomorrow—what we will eat, drink, or wear (see Matthew 6:31-34). In that sense we have only two days: “today” and “that day.” “That day” is the day our breath stops and financial activity is no longer needed; it can also mean the day we face the final judgment. For the sake of that day, let us, on every today, be faithful to God and honest and loving toward people in our finances. In truth, every financial act today—earning, giving, using, saving, investing—reflects our relationship with God. Eternity is that real, and that closely tied to today.",
          },
          {
            zh: "以下這些和財務有關的聖經經文，盼望對你我都是一種提醒：「敬畏耶和華心存謙卑，就得富有、尊榮、生命為賞賜。」（《箴言》22:4）「你們要謹慎自守，免去一切的貪心；因為人的生命不在乎家道豐富。」（參《路加福音》12:15）「敬虔加上知足的心便是大利了……只要有衣有食，就當知足……但你這屬上帝的人要逃避這些事，追求公義、敬虔、信心、愛心、忍耐、溫柔。你要為真道打那美好的仗，持定永生。」（參《提摩太前書》6:6-12）",
            en: "May these money-related passages be a reminder to us both: “Humility is the fear of the Lord; its wages are riches and honor and life.” (Proverbs 22:4) “Watch out! Be on your guard against all kinds of greed; life does not consist in an abundance of possessions.” (see Luke 12:15) “Godliness with contentment is great gain... if we have food and clothing, we will be content with that... But you, man of God, flee from all this, and pursue righteousness, godliness, faith, love, endurance and gentleness. Fight the good fight of the faith. Take hold of the eternal life.” (see 1 Timothy 6:6-12)",
          },
          {
            zh: "那麼，在財務管理上，我是要以上帝為中心呢，還是要以我自己為中心？對於基於真理的財務自由，使徒保羅總結了一個智慧的生活態度：「我並不是因缺乏說這話，我無論在什麼景況都可以知足，這是我已經學會了。我知道怎樣處卑賤，也知道怎樣處豐富，或飽足、或飢餓、或有餘、或缺乏，隨事隨在，我都得了秘訣。我靠著那加給我力量的，凡事都能作。」（《腓立比書》4:11-13）願我們都在禱告中學習做一位忠心、良善、有見識的管家，每日向主祈求三件事：「更深刻認識你，更虔誠敬愛你，更緊緊地跟隨你。」",
            en: "So, in managing money, will I be God-centered or self-centered? Regarding the financial freedom grounded in truth, the apostle Paul summed up a wise attitude to life: “I am not saying this because I am in need, for I have learned to be content whatever the circumstances. I know what it is to be in need, and I know what it is to have plenty. I have learned the secret of being content in any and every situation, whether well fed or hungry, whether living in plenty or in want. I can do all this through Him who gives me strength.” (Philippians 4:11-13) May we all learn in prayer to be faithful, good, and wise stewards, asking the Lord three things each day: to know You more deeply, to love You more devoutly, and to follow You more closely.",
          },
          {
            zh: "（編註：末段禱詞出於英國主教 Richard of Chichester（1197-1253），後曾幾度譜成曲調不同的詩歌《每一日》（Day by Day）。H1B 為美國特殊專業人員／臨時工作簽證；OPT 即 Optional Practical Training，是美國 F1 學生簽證畢業後的實習期。）",
            en: "(Editor's notes: The closing prayer comes from Richard of Chichester, an English bishop (1197-1253), and was later set to several hymn tunes titled “Day by Day.” H1B is a U.S. specialty-occupation / temporary work visa; OPT, Optional Practical Training, is the post-graduation practical-training period for F1 student-visa holders.)",
          },
        ],
      },
    ],
  },
  {
    slug: "money-and-marriage-review",
    title: {
      zh: "《金錢與婚姻─蒙福之道》一書導讀",
      en: "A Reader's Guide to “Money and Marriage—God's Way”",
    },
    author: { zh: "溫英幹", en: "Ying-Gan Wen" },
    date: "2020-08-02",
    displayDate: { zh: "2020 年 8 月 2 日", en: "August 2, 2020" },
    readingTime: { zh: "約 13 分鐘", en: "13 min read" },
    excerpt: {
      zh: "冠冕美國華人外展事工主任溫英幹教授，為戴浩華《金錢與婚姻─蒙福之道》一書撰寫的導讀，介紹作者背景、全書架構與各篇內容，以及本書的實用性與限制。",
      en: "Professor Ying-Gan Wen, director of Crown's North American Chinese Outreach Ministry, introduces Howard Dayton's “Money and Marriage—God's Way”—the author's background, the book's structure and contents, and its usefulness and limitations.",
    },
    image: "crownBookMoneyMarriage",
    sourceUrl: "https://www.crown-nac.org/blog",
    sections: [
      {
        paragraphs: [
          {
            zh: "《金錢與婚姻─蒙福之道》（Money and Marriage—God's Way, by Howard Dayton, Moody Publishers, 2009）。中文譯本由台灣冠冕真道理財協會出版，譯者：顧美芬、林韡勻，總經銷：台北道聲出版社，中譯本出版於 2014 年 7 月。作者為戴浩華（Howard Dayton，美國冠冕共同創辦人）。導讀：溫英幹教授（冠冕美國華人外展事工主任、台灣東華大學榮譽教授）。",
            en: "“Money and Marriage—God's Way” by Howard Dayton (Moody Publishers, 2009). The Chinese translation was published by Taiwan Crown, translated by Mei-Fen Ku and Wei-Yun Lin, distributed by Taosheng Publishing House (Taipei), with the Chinese edition released in July 2014. The author is Howard Dayton, co-founder of Crown in the United States. This reader's guide is written by Professor Ying-Gan Wen, director of Crown's North American Chinese Outreach Ministry and honorary professor at National Dong Hwa University, Taiwan.",
          },
        ],
      },
      {
        heading: { zh: "一、前言：本書作者的背景與著作", en: "1. Introduction: The Author's Background and Works" },
        paragraphs: [
          {
            zh: "本書作者戴浩華（Howard L. Dayton, Jr., 1943-）是美國冠冕財務事工的合夥創辦人，另一位合夥創辦人是著名的基督徒理財專家薄來瑞（Larry Burkett, 1939-2003）。他們兩位都寫了幾本應用聖經原則理財的暢銷書，以及聖經理財的小組研讀教材，在全世界被廣為採用。",
            en: "The author, Howard L. Dayton, Jr. (b. 1943), is a co-founder of Crown Financial Ministries in the United States; the other co-founder was the well-known Christian financial expert Larry Burkett (1939-2003). Both wrote several bestselling books applying biblical principles to money, as well as small-group study materials on biblical finance that are widely used around the world.",
          },
          {
            zh: "戴浩華成長於喬治亞州，1967 年於康奈爾大學旅館學院畢業後在海軍服役兩年半，1969 年在佛羅里達州開設一間很成功的餐廳，1972 年開始經營商業房地產。1974 年他的生命開始大幅改變——有一位商業夥伴建議他查考聖經對錢財的看法，他們發現聖經裡竟然有 2350 節經文談到錢財或理財。他覺得神給他負擔去分享所發現的、改變生命的原則。1985 年他成立「冠冕事工」（Crown Ministries），發展出一套聖經理財小組研習教材；2000 年與薄來瑞的事工合併成立「冠冕理財事工」，由薄來瑞任執行長。薄來瑞於 2003 年因癌症去世，由戴浩華繼任執行長（均為不支薪義工）到 2007 年退休，之後由班查克（Chuck Bentley）接任執行長迄今。",
            en: "Dayton grew up in Georgia. After graduating from Cornell University's School of Hotel Administration in 1967, he served two and a half years in the Navy, opened a very successful restaurant in Florida in 1969, and began a commercial real-estate business there in 1972. In 1974 his life began to change dramatically: a business partner suggested he study what the Bible says about money, and they discovered that Scripture contains 2,350 verses about money or finances. He sensed God's call to share these life-changing principles. In 1985 he founded Crown Ministries and developed a biblical financial small-group curriculum; in 2000 it merged with Burkett's ministry to form Crown Financial Ministries, with Burkett as CEO. After Burkett died of cancer in 2003, Dayton served as CEO (both as unpaid volunteers) until retiring in 2007, after which Chuck Bentley took over as CEO to the present day.",
          },
          {
            zh: "在冠冕期間，他編寫《理財有道小組研習手冊》（Biblical Financial Study），該手冊風行北美，並在全世界約九十個國家的分會推廣使用；與薄來瑞合作的《經商有道》研習手冊及影音教材也翻譯成多種語言，被全世界的工商界基督徒使用。「台灣冠冕真道理財協會」也是冠冕的分會之一。2009 年戴浩華和幾位同工離開冠冕，另成立「羅盤事工」（Compass—Finances God's Way, compass1.org），聚焦於小組查經；到 2014 年，全世界有 48 個國家參與羅盤事工，與冠冕事工相互輝映，共同推廣聖經理財。",
            en: "During his time at Crown he wrote the Biblical Financial Study small-group handbook, which became popular in North America and was used by Crown branches in about ninety countries; the “Business God's Way” study handbook and audiovisual materials he produced with Burkett were also translated into many languages and used by Christian business people worldwide. Taiwan Crown is one of Crown's branches. In 2009 Dayton and several coworkers left Crown to found Compass—Finances God's Way (compass1.org), focusing on small-group Bible study; by 2014, forty-eight countries were involved in Compass, complementing Crown's work in promoting biblical finance.",
          },
          {
            zh: "戴浩華前後共出版六本書：Our Money: Frustration or Freedom（1979）、Your Money Counts（1997）、Free and Clear（2006）、Your Money Map（2009）、Money and Marriage God's Way（2009），以及 Business God's Way；此外還與美國聖經公會合作出版 Financial Stewardship Bible（2011），把聖經提到理財的經文標示出來並加上研讀手冊。其中 Your Money Counts 已由台灣冠冕譯成中文《理財贏家》，是參加冠冕理財有道小組研習前的必讀書。",
            en: "Dayton has published six books: Our Money: Frustration or Freedom (1979), Your Money Counts (1997), Free and Clear (2006), Your Money Map (2009), Money and Marriage God's Way (2009), and Business God's Way; he also partnered with the American Bible Society to publish the Financial Stewardship Bible (2011), which highlights the finance-related verses of Scripture and adds a study guide. Your Money Counts has been translated into Chinese by Taiwan Crown and is required reading before joining the Crown Biblical Financial Study small group.",
          },
          {
            zh: "由於作者在聖經理財方面的卓越貢獻，2008 年他獲得美國奧斯波利大學（Asbury University）榮譽博士學位；2014 年三月該校以他的姓名成立戴浩華商學院（The Howard Dayton School of Business），該學院重視實務與品格教育。友人描述戴浩華的人格特質為「服務與犧牲，而非自私與空談」（service and sacrifice, not self and stuff）。戴浩華與妻子碧芙（Beverley）於 1971 年結婚，育有兩位成年孩子，目前住在佛羅里達州奧蘭多市。了解本書作者的背景對閱讀本書大有助益，因為讀書有如讀其人。",
            en: "For his outstanding contribution to biblical finance, Dayton received an honorary doctorate from Asbury University in 2008; in March 2014 the university established the Howard Dayton School of Business in his name, a school that emphasizes practice and character education. A friend described Dayton's character as “service and sacrifice, not self and stuff.” Dayton married his wife Beverley in 1971; they have two grown children and live in Orlando, Florida. Understanding the author's background greatly helps in reading this book, for to read a book is in a way to read the person.",
          },
        ],
      },
      {
        heading: { zh: "二、本書的目的與內容概覽", en: "2. The Book's Purpose and an Overview of Its Contents" },
        paragraphs: [
          {
            zh: "在首頁作者將本書獻給他的妻子——「碧芙，我的妻子、最好的朋友、終生伴侶及英雄。」可見他們四十多年的婚姻非常美滿穩固。書中舉了許多例子說明他們夫婦在婚姻過程中在理財及婚姻關係上的挑戰及解決方式，可作為讀者的模範。作者在前言點出本書目的：「本書將轉變你的婚姻與財務……當你開始學習掌管宇宙的神如何建立美好婚姻和成功地管理金錢，並在生活中實踐這些原則時，你就會轉變。」",
            en: "On the first page the author dedicates the book to his wife—“Beverley, my wife, best friend, lifelong companion, and hero.” Clearly their marriage of more than forty years has been happy and secure. The book gives many examples of the challenges he and his wife faced in finances and in their relationship, and how they resolved them, as models for the reader. In the preface the author states the book's purpose: “This book will transform your marriage and your finances... As you begin to learn how the God who rules the universe builds a good marriage and manages money successfully, and as you practice these principles in life, you will be transformed.”",
          },
          {
            zh: "本書對象是未婚夫妻及任何已婚者，不論貧富及婚姻狀況；學習本書所談的原則及見證，並確實實行，就有成效——就怕將本書束之高閣，或讀了卻不去行。根據多種調查，夫妻離婚的主要原因是財務、溝通與性關係（包括外遇）。財務問題的一大部分也是溝通不良及夫婦沒有共同的價值觀所引起，因此金錢與婚姻的關係非常密切。",
            en: "The book is written for engaged couples and any married person, regardless of wealth or marital situation; learning its principles and testimonies and actually practicing them brings results—the only danger is shelving the book, or reading without doing. According to various surveys, the main causes of divorce are finances, communication, and the sexual relationship (including affairs). A large part of financial problems also stems from poor communication and a lack of shared values, so money and marriage are closely intertwined.",
          },
          {
            zh: "本書分為六篇十七章及結論。每一篇後面都有回應問題、求助資源（包括網上及其他資源）以及一對夫婦的理財見證。第一篇是婚姻的基本原則；第二篇談夫妻在財務處理上的不同背景與個性，以及如何溝通、以平衡的方式解決財務問題，並創立鼓勵、感謝、慶賀的家庭文化；第三篇討論使財務自由的實際步驟，用作者設計的「金錢地圖」，教導讀者按圖索驥、有計劃地編制預算，一步步邁向財務自由；第四篇討論邁向財務自由過程中夫妻常面對的挑戰、問題與危機，及如何化險為夷；第五篇為婚姻不同階段（從訂婚到空巢）的財務處理方式；第六篇處理是否要當全職媽媽，以及再婚家庭的財務問題與解決之道。每一篇都兼顧聖經原則與實際應用步驟，值得細讀並加以應用。",
            en: "The book has six parts, seventeen chapters, and a conclusion. Each part ends with response questions, help resources (online and otherwise), and a couple's financial testimony. Part 1 covers the basic principles of marriage; Part 2 addresses spouses' differing backgrounds and personalities in handling money, and how to communicate, solve financial problems in a balanced way, and build a family culture of encouragement, gratitude, and celebration; Part 3 discusses the practical steps toward financial freedom, using the author's “Money Map” to guide readers in budgeting deliberately and moving step by step toward financial freedom; Part 4 discusses the challenges, problems, and crises couples commonly face on the way to financial freedom, and how to weather them; Part 5 covers finances at different stages of marriage (from engagement to the empty nest); Part 6 addresses whether to be a full-time mother, and the financial issues and solutions for blended families. Every part balances biblical principle with practical steps, well worth careful reading and application.",
          },
        ],
      },
      {
        heading: { zh: "三、本書內容各篇介紹", en: "3. An Overview of Each Part" },
        paragraphs: [
          {
            zh: "第一篇：婚姻乃是一生之久的委身。作者以一對因財務危機瀕臨離婚的夫婦求助開場，提出「用神的方式經營家庭財務」，並簡述聖經對婚姻的態度：婚姻是神所設立的，夫妻乃是一體（創世記 2:24；馬太福音 19:6），在身體、情感、靈命與財務方面都需合一。夫妻的關係優先於與雙方父母之間的關係；作者引用一位婚姻專家的話：「所有婚姻問題的根本都來自於未克離開或未克連合。」保持婚姻健康，需了解夫妻扮演的角色，前提乃是「彼此順服」（以弗所書 5:21），夫妻地位平等，要彼此相愛、彼此順服、用愛心彼此服事（加拉太書 5:13）。",
            en: "Part 1: Marriage is a lifelong commitment. The author opens with a couple on the brink of divorce over a financial crisis who seek his help, and proposes “managing family finances God's way.” He summarizes the Bible's view of marriage: marriage is instituted by God, and husband and wife are one flesh (Genesis 2:24; Matthew 19:6), needing unity in body, emotions, spirit, and finances. The marriage relationship takes priority over the relationship with each set of parents; the author quotes a marriage expert: “The root of all marriage problems is a failure to leave or a failure to cleave.” Keeping a marriage healthy requires understanding each spouse's role, on the basis of “mutual submission” (Ephesians 5:21); husband and wife are equal, to love and submit to one another and serve one another in love (Galatians 5:13).",
          },
          {
            zh: "第二篇：鼓舞篇——原因與做法。作者「為夫妻不同而喊萬歲」：夫妻之間必有許多差異（性別、背景、個性、屬靈），「神把你的配偶賜給你，是要使你完全，不是要使你沮喪。」在處理錢財上要學習良好溝通，最重要的是傾聽對方、彼此誠實；作者建議夫婦每週有一個「金錢約會」，一起討論財務並一起禱告——「當夫妻一起為財務禱告，會學習到什麼是對配偶重要的事，也邀請宇宙的神親自關切他們的收入與支出。」此外，夫妻要學習彼此鼓勵、「成為你配偶的啦啦隊」，並在理財進步時彼此慶賀。",
            en: "Part 2: Encouragement—why and how. The author “cheers for the differences between spouses”: couples will always differ (gender, background, personality, spiritual life), and “God gave you your spouse to complete you, not to frustrate you.” In handling money they must learn good communication—above all listening to each other and being honest. The author recommends a weekly “money date” to discuss finances and pray together—“when couples pray together over their finances, they learn what matters to their spouse, and they invite the God of the universe to care personally about their income and spending.” Couples should also learn to encourage each other, to “be your spouse's cheerleader,” and to celebrate progress in their finances.",
          },
          {
            zh: "第三篇：金錢——開支與收入的進進出出。本篇最重要的是「金錢地圖」（Money Map），作者和冠冕團隊設計這套地圖引導讀者通往財務自由，已幫助千萬人擺脫債務、累積儲蓄、聰明投資。金錢地圖循序漸進，共有七個目的地：設立支出計劃並開始儲存應急基金；還清卡債；還清消費性債務；為大件購買（房子、退休金及小孩教育基金等）儲蓄；購房及開始聰明投資；還清房貸及存足教育基金；最後存足退休金，達到財務自由，更能事奉神。作者查考聖經發現共有 2350 節談到錢財——「每當我應用聖經中的財務真理，都發現自己與耶穌基督的關係進步了。」承認神是一切的擁有者，我們的身份只是管家，要忠心管理並慷慨奉獻（至少所得的十分之一）。此外，負債是婚姻中財務壓力與衝突的一大來源，受債務捆綁的就成為債主的奴僕（箴言 22:7），本篇提到還債的方法，也警告不可為人作保。花費習慣影響夫妻關係甚大，要學習知足、不與人比較，並忠實執行預算。",
            en: "Part 3: Money—the flow of expenses and income. The heart of this part is the Money Map, designed by the author and the Crown team to guide readers toward financial freedom; it has helped millions escape debt, build savings, and invest wisely. The Money Map proceeds in seven destinations: set up a spending plan and begin an emergency fund; pay off credit-card debt; pay off consumer debt; save for major purchases (a home, retirement, children's education); buy a home and begin investing wisely; pay off the mortgage and fully fund education; and finally fully fund retirement, reaching financial freedom to serve God all the more. The author found 2,350 verses about money in Scripture—“every time I apply the Bible's financial truths, I find my relationship with Jesus Christ has grown.” Acknowledging God as the owner of everything, we are merely stewards, to manage faithfully and give generously (at least a tenth of our income). Moreover, debt is a major source of financial stress and conflict in marriage, and the one in debt becomes a slave to the lender (Proverbs 22:7); this part discusses methods of repayment and warns against co-signing for others. Spending habits deeply affect the marriage relationship, so learn contentment, avoid comparison, and faithfully follow a budget.",
          },
          {
            zh: "第四篇：常見的問題與糾紛。夫妻生活中都會遭遇嚴重挑戰（智障的孩子、失業、生病或意外、成年子女仍住家中、財產被沒收或破產等），當挑戰來臨，第一步是溝通、定時分享及禱告——「婚姻越強健、財務越健全，越能夠面對問題。」最常造成夫妻衝突的因素往往與錢財有關；化解衝突的方式，一是向對方示愛及表示好意，另一是彼此饒恕。配偶的「信任帳戶」越滿，越能感受你的愛，也越容易處理衝突。作者建議在衝突爆發前寫下雙方都同意的溝通基本規則。面臨危機時，先認清危機的嚴重性，經過禱告與同意處理原則，並依危機程度尋求不同層次的諮商。",
            en: "Part 4: Common problems and conflicts. Every couple faces serious challenges (a child with special needs, job loss, illness or accident, adult children still at home, foreclosure or bankruptcy). When a challenge comes, the first step is communication, regular sharing, and prayer—“the stronger the marriage and the healthier the finances, the better you can face problems.” The factors that most often cause conflict tend to involve money; conflict is resolved by showing love and goodwill to one another and by mutual forgiveness. The fuller a spouse's “trust account,” the more your love is felt and the easier conflict becomes to handle. The author suggests writing down mutually agreed ground rules for communication before a conflict erupts. In a crisis, first recognize its seriousness, pray and agree on principles for handling it, and seek different levels of counsel according to the severity.",
          },
          {
            zh: "第五篇：生命時光——從訂婚到空巢。結婚之前，每對訂婚夫妻都要做到四件事：將財務完全公開；討論彼此的財務目標、價值觀與期待；一起建立支出計劃；學習以神的方式理財——作者建議除非做到這四項，否則不要結婚。也要注意婚禮的成本，不要借債鋪張，並遵照聖經原則處理與姻親的關係。作者以自己四十多年的婚姻經歷陳述三個階段：新婚、滿巢與空巢，每一階段都會面臨生活方式、買房或租房、遺囑與遺產規劃等財務課題。",
            en: "Part 5: Seasons of life—from engagement to the empty nest. Before marriage, every engaged couple should do four things: fully disclose their finances; discuss their financial goals, values, and expectations; build a spending plan together; and learn to handle money God's way—the author advises against marrying until these four are done. Watch the cost of the wedding, do not go into debt to be extravagant, and handle in-law relationships by biblical principle. Drawing on his own marriage of more than forty years, the author describes three stages—newlywed, full nest, and empty nest—each facing financial issues of lifestyle, buying versus renting, and wills and estate planning.",
          },
          {
            zh: "第六篇：建立自己的甜蜜家庭。要當全職媽媽嗎？作者建議先計算妻子損失一份收入對家庭財務的實際影響，扣除繳稅、交通費、托兒費及額外治裝費後，妻子出外工作的淨收入其實不高；若能在家接些工作，淨收入可能更高。夫妻最好在婚前婚後就彼此同意，一起禱告尋求神的旨意，若必須外出工作也不必有罪惡感。至於再婚（繼親）家庭，在婚姻、財務及帶領孩子上都更複雜，最重要的是溝通，並鼓勵盡可能財務合一、對撫養孩子有共識。最後的結論中，作者希望本書不是放在書架上，而是與配偶一起研讀並實踐；應用所學最好的方式之一是教導別人。",
            en: "Part 6: Building your own sweet home. Should the wife be a full-time mother? The author suggests first calculating the real impact on family finances of losing her income: after taxes, commuting, childcare, and extra clothing costs, her net income from working outside may not be high; if she can take on some work from home, the net may be higher. It is best for a couple to agree before and after marriage, praying together to seek God's will, and there is no need to feel guilty if she must work outside. As for remarriage (blended) families, marriage, finances, and parenting are all more complex; the most important thing is communication, with encouragement to be as financially united as possible and to agree on raising the children. In the conclusion, the author hopes the book will not sit on a shelf but be studied and practiced together as a couple; one of the best ways to apply what you learn is to teach others.",
          },
        ],
      },
      {
        heading: { zh: "四、本書的實用性及限制", en: "4. The Book's Usefulness and Limitations" },
        paragraphs: [
          {
            zh: "實用性：本書不但教導以聖經為本的理財原則與方法，也藉著財務健全使婚姻關係更穩固、與主的關係更密切。因為離婚的主要原因之一是理財問題，其次是溝通，本書在這兩方面都給予實際而中肯的教導。作者強調結婚之前就要開始理財；但即使已經結婚很久，本書仍具參考與實用價值——無論何時開始都不會太晚。即使已是空巢期，也可將書中原則教導下一代。筆者高度推薦將結婚及已婚的基督徒夫婦一起投資時間好好研讀本書。此外，第十七章討論的繼親家庭，許多原則也適合單親家庭參考。若讀者參加過冠冕的理財有道小組研習，研讀本書將更容易，因為許多原則（包括金錢地圖）在教材中已談到，而本書強調婚姻關係，可與小組研習相輔相成。",
            en: "Usefulness: The book not only teaches Bible-based financial principles and methods, but through financial health strengthens the marriage relationship and draws the couple closer to the Lord. Since one of the main causes of divorce is money problems and the next is communication, the book gives practical, well-grounded teaching on both. The author stresses beginning to manage money before marriage; yet even for those long married, the book has reference and practical value—it is never too late to begin. Even in the empty-nest stage, its principles can be taught to the next generation. This reviewer highly recommends that engaged and married Christian couples invest time to study the book together. Moreover, many principles in Chapter 17 on blended families also serve single-parent families well. Readers who have taken the Crown Biblical Financial Study small group will find the book easier, since many principles (including the Money Map) are covered there; and because this book emphasizes the marriage relationship, it complements the small-group study.",
          },
          {
            zh: "限制：因為本書（以及冠冕出版的其他書）原以美國讀者為對象，讀到美國的例子（例如退休金、大學教育基金及遺產規劃）時，非美國的讀者需變通應用。其次，由於美國冠冕財務事工的網頁（crown.org）在戴浩華離開後大幅改版，本書原先提到的幾個網站已不存在，譯者已加註並查到其他類似網頁（例如作者新事工羅盤的網頁 compass1.org）以供參考；台灣或其他地區的讀者請參考當地的冠冕網頁（如台灣 crown.org.tw）。",
            en: "Limitations: Because this book (and other Crown publications) was originally written for American readers, non-American readers must adapt the U.S. examples (such as retirement funds, college education funds, and estate planning). Also, because the U.S. Crown Financial Ministries website (crown.org) was substantially redesigned after Dayton left, several sites mentioned in the book no longer exist; the translators have added notes and located similar pages (such as the author's new ministry Compass at compass1.org) for reference. Readers in Taiwan or other regions should consult their local Crown website (for example, Taiwan's crown.org.tw).",
          },
        ],
      },
    ],
  },
];

export function findArticleBySlug(slug: string): CrownArticle | undefined {
  return crownArticles.find((article) => article.slug === slug);
}
