/** Short chemistry facts for the top strip. Each links to the note or article that explains it. */
export type Fact = { en: string; hi: string; href: string };

export const FACTS: Fact[] = [
  {
    en: 'A teaspoon of water holds about 1.7 × 10²³ water molecules.',
    hi: 'एक चम्मच पानी में लगभग 1.7 × 10²³ जल अणु होते हैं।',
    href: '/notes/class-11-some-basic-concepts',
  },
  {
    en: 'If an atom’s nucleus were the size of a marble, the whole atom would be about a kilometre wide.',
    hi: 'अगर परमाणु का नाभिक एक कंचे जितना हो, तो पूरा परमाणु लगभग एक किलोमीटर चौड़ा होगा।',
    href: '/notes/class-11-structure-of-atom',
  },
  {
    en: 'Fluorine is so electronegative that it even forms compounds with xenon, a noble gas.',
    hi: 'फ़्लुओरीन इतना विद्युत-ऋणात्मक है कि यह उत्कृष्ट गैस ज़ीनॉन के साथ भी यौगिक बना लेता है।',
    href: '/notes/class-11-periodicity',
  },
  {
    en: 'Liquid oxygen sticks to a magnet, because an O₂ molecule has two unpaired electrons.',
    hi: 'द्रव ऑक्सीजन चुंबक से चिपक जाती है, क्योंकि O₂ अणु में दो अयुग्मित इलेक्ट्रॉन होते हैं।',
    href: '/notes/class-11-chemical-bonding',
  },
  {
    en: 'Diamond slowly turning into graphite is spontaneous, but it would take far longer than human history.',
    hi: 'हीरे का ग्रेफ़ाइट में बदलना स्वतः प्रवर्तित है, पर इसमें मानव इतिहास से भी कहीं अधिक समय लगेगा।',
    href: '/notes/class-11-thermodynamics',
  },
  {
    en: 'Your blood stays at a pH of about 7.4, held steady by a carbonic acid–bicarbonate buffer.',
    hi: 'आपके रक्त का pH लगभग 7.4 रहता है, जिसे कार्बोनिक अम्ल–बाइकार्बोनेट बफ़र स्थिर रखता है।',
    href: '/notes/class-11-equilibrium',
  },
  {
    en: 'A carbon atom can form four bonds, which is why millions of organic compounds are known.',
    hi: 'कार्बन परमाणु चार आबंध बना सकता है, इसीलिए लाखों कार्बनिक यौगिक ज्ञात हैं।',
    href: '/notes/class-11-goc',
  },
  {
    en: 'All six carbon–carbon bonds in benzene are the same length: halfway between a single and a double bond.',
    hi: 'बेन्ज़ीन के छहों कार्बन–कार्बन आबंध बराबर लंबाई के होते हैं: एकल और द्वि-आबंध के बीच।',
    href: '/notes/class-11-hydrocarbons',
  },
  {
    en: 'Sea water freezes at about −2 °C, not 0 °C. The dissolved salt lowers its freezing point.',
    hi: 'समुद्री जल 0 °C पर नहीं, लगभग −2 °C पर जमता है। घुला हुआ नमक हिमांक घटा देता है।',
    href: '/notes/class-12-solutions',
  },
  {
    en: 'A hydrogen fuel cell makes electricity, and its only waste product is water.',
    hi: 'हाइड्रोजन ईंधन सेल बिजली बनाता है, और उसका एकमात्र उप-उत्पाद पानी है।',
    href: '/notes/class-12-electrochemistry',
  },
  {
    en: 'Many reactions roughly double in speed for every 10 °C rise. That’s why food lasts longer in a fridge.',
    hi: 'हर 10 °C ताप बढ़ने पर कई अभिक्रियाओं की गति लगभग दोगुनी हो जाती है। इसीलिए फ़्रिज में खाना ज़्यादा दिन चलता है।',
    href: '/notes/class-12-kinetics',
  },
  {
    en: 'Copper sulphate is blue but zinc sulphate is white: Zn²⁺ has a full d-shell, so it absorbs no visible light.',
    hi: 'कॉपर सल्फ़ेट नीला है पर ज़िंक सल्फ़ेट सफ़ेद: Zn²⁺ का d-कोश पूरा भरा है, इसलिए यह दृश्य प्रकाश नहीं सोखता।',
    href: '/notes/class-12-d-f-block',
  },
  {
    en: 'Haemoglobin is a coordination compound: an iron ion at its centre carries oxygen around your body.',
    hi: 'हीमोग्लोबिन एक उपसहसंयोजन यौगिक है: इसके केंद्र में लोहे का आयन पूरे शरीर में ऑक्सीजन पहुँचाता है।',
    href: '/notes/class-12-coordination',
  },
  {
    en: 'A single chlorine atom from a CFC can destroy thousands of ozone molecules.',
    hi: 'CFC से निकला एक क्लोरीन परमाणु हज़ारों ओज़ोन अणुओं को नष्ट कर सकता है।',
    href: '/notes/class-12-haloalkanes',
  },
  {
    en: 'Phenol (carbolic acid) was one of the first antiseptics used in surgery.',
    hi: 'फ़ीनॉल (कार्बोलिक अम्ल) सर्जरी में इस्तेमाल होने वाले पहले रोगाणुरोधकों में से एक था।',
    href: '/notes/class-12-alcohols',
  },
  {
    en: 'The smell of vanilla comes from vanillin, and the smell of cinnamon from cinnamaldehyde. Both are aldehydes.',
    hi: 'वनीला की ख़ुशबू वैनिलिन से और दालचीनी की सिनैमैल्डिहाइड से आती है। दोनों ऐल्डिहाइड हैं।',
    href: '/notes/class-12-aldehydes-ketones',
  },
  {
    en: 'The fishy smell of fish comes from amines. Lemon juice, an acid, turns them into odourless salts.',
    hi: 'मछली की गंध ऐमीनों से आती है। नींबू का रस (अम्ल) उन्हें गंधहीन लवणों में बदल देता है।',
    href: '/notes/class-12-amines',
  },
  {
    en: 'The DNA in a single human cell, stretched out, would be about 2 metres long.',
    hi: 'एक मानव कोशिका का DNA खींचकर फैलाया जाए तो लगभग 2 मीटर लंबा होगा।',
    href: '/notes/class-12-biomolecules',
  },
  {
    en: 'Ice is about 9% less dense than liquid water, so lakes freeze from the top down.',
    hi: 'बर्फ़ द्रव जल से लगभग 9% कम घनी होती है, इसलिए झीलें ऊपर से नीचे की ओर जमती हैं।',
    href: '/articles/why-ice-floats',
  },
  {
    en: 'Red fireworks get their colour from strontium, green from barium and blue from copper.',
    hi: 'आतिशबाज़ी का लाल रंग स्ट्रॉन्शियम से, हरा बेरियम से और नीला कॉपर से आता है।',
    href: '/articles/firework-colours',
  },
  {
    en: 'Rusting works like a tiny battery on the surface of iron.',
    hi: 'लोहे पर जंग लगना उसकी सतह पर चल रही एक छोटी बैटरी की तरह है।',
    href: '/articles/rusting-a-battery',
  },
  {
    en: 'Soap cleans grease by wrapping it in tiny balls called micelles.',
    hi: 'साबुन चिकनाई को मिसेल नाम की छोटी गेंदों में लपेटकर साफ़ करता है।',
    href: '/articles/how-soap-removes-oil',
  },
  {
    en: 'Onions make you cry only after they are cut: broken cells release a gas that irritates your eyes.',
    hi: 'प्याज़ कटने के बाद ही रुलाता है: टूटी कोशिकाएँ एक गैस छोड़ती हैं जो आँखों में जलन करती है।',
    href: '/articles/why-onions-make-us-cry',
  },
];

/** Same fact for everyone on a given day. */
export function factIndexForToday(date = new Date()): number {
  const start = Date.UTC(date.getFullYear(), 0, 0);
  const day = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - start) / 86400000);
  return day % FACTS.length;
}
