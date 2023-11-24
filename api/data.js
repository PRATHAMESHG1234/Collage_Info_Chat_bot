const data = [
  {
    problem_category: "Relationships ",
    problem_description: "Dealing with conflicts ",
    philosophical_insights: [
      {
        sloka: "Chapter 2, Verse 47",
        speaker: `Lord Krushna Say's`,
        sanskrit:
          "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते संगोऽस्त्वकर्मणि॥",
        translation:
          "You have the right to perform your prescribed duty, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
      },
      {
        sloka: "Chapter 2, Verse 3",
        speaker: `Lord abc Say's`,
        sanskrit:
          "क्लैब्यं मा स्म गमः पार्थ नैतत्त्वय्युपपद्यते। क्षुद्रं हृदयदौर्बल्यं त्यक्त्वोत्तिष्ठ परंतप॥",
        translation:
          "O Partha (Arjuna), do not yield to unmanliness. It does not befit you. Give up such petty weakness of heart and arise, O chastiser of enemies!",
      },
      {
        sloka: "Chapter 2, Verse 31",
        speaker: `Lord Krushna Say's`,
        sanskrit:
          "स्वधर्ममपि चावेक्ष्य न विकम्पितुमर्हसि। धर्म्याद्धि युद्धाछ्रेयोऽन्यत्क्षत्रियस्य न विद्यते॥",
        translation:
          "Considering your specific duty as a warrior, you should not waver. Indeed, for a warrior, there is no better engagement than fighting for a righteous cause.",
      },
    ],
  },
  {
    problem_category: "Self-Improvement ",
    problem_description: "Overcoming self-doubt ",
    philosophical_insights: [
      {
        sloka: "Chapter 6, Verse 5",
        speaker: `Lord Krushna Say's`,
        sanskrit:
          "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्। आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
        translation:
          "One must elevate oneself by one’s own mind, not degrade oneself. The mind alone is the friend of the self, and the mind alone is the enemy of the self.",
      },
      {
        sloka: "Chapter 6, Verse 6",
        speaker: `Lord Krushna Say's`,
        sanskrit:
          "बन्धुरात्मात्मनस्तस्य येनात्मैवात्मना जितः। अनात्मनस्तु शत्रुत्वे वर्तेतात्मैव शत्रुवत्॥",
        translation:
          "For one who has conquered the mind, the mind is the best of friends; but for one who has failed to do so, the mind will remain the greatest enemy.",
      },
    ],
  },
  {
    problem_category: "Stress Management",
    problem_description: "Coping with overwhelming stress",
    philosophical_insights: [
      {
        sloka: "Chapter 2, Verse 48",
        speaker: "Lord Krishna",
        sanskrit:
          "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय। सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥",
        translation:
          "Perform your duties in an equipoised manner, O Arjuna, abandoning attachment to success and failure. Such equanimity is called yoga.",
      },
      {
        sloka: "Chapter 2, Verse 50",
        speaker: "Lord Krishna",
        sanskrit:
          "बुद्धियुक्तो जहातीह उभे सुकृतदुष्कृते। तस्माद्योगाय युज्यस्व योगः कर्मसु कौशलम्॥",
        translation:
          "A person equipped with wisdom gives up both good and bad deeds in this world. Therefore, strive for yoga, which is the art of skillful action.",
      },
    ],
  },
  {
    problem_category: "Decision Making",
    problem_description: "Making wise and discerning choices",
    philosophical_insights: [
      {
        sloka: "Chapter 2, Verse 41",
        speaker: "Lord Krishna",
        sanskrit:
          "व्यवसायात्मिका बुद्धिरेकेह कुरुनन्दन। बहुशाखा ह्यनन्ताश्च बुद्धयोऽव्यवसायिनाम्॥",
        translation:
          "O Arjuna, the intellect of those who are indecisive is many-branched and endless. But the intellect of those who are steadfast and resolute is one-pointed and focused.",
      },
      {
        sloka: "Chapter 2, Verse 47",
        speaker: "Lord Krishna",
        sanskrit:
          "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते संगोऽस्त्वकर्मणि॥",
        translation:
          "You have the right to perform your prescribed duties, but you should not be attached to the results. Do not consider yourself solely responsible for the outcomes and do not give up performing your duties.",
      },
    ],
  },
  {
    problem_category: "Work-Life Balance",
    problem_description: "Harmonizing professional and personal life",
    philosophical_insights: [
      {
        sloka: "Chapter 3, Verse 9",
        speaker: "Lord Krishna",
        sanskrit:
          "यज्ञार्थात्कर्मणोऽन्यत्र लोकोऽयं कर्मबन्धनः। तदर्थं कर्म कौन्तेय मुक्तसङ्गः समाचर॥",
        translation:
          "Work done as a sacrifice for the Supreme leads to freedom from the bondage of work. Therefore, O Arjuna, perform your prescribed duties for the sake of sacrifice, free from attachment.",
      },
      {
        sloka: "Chapter 3, Verse 16",
        speaker: "Lord Krishna",
        sanskrit:
          "एवं प्रवर्तितं चक्रं नानुवर्तयतीह यः। अघायुरिन्द्रियारामो मोघं पार्थ स जीवति॥",
        translation:
          "O Partha, one who does not follow the wheel thus set in motion, who is of sinful tendencies and who is attached to sense gratification, lives in vain.",
      },
    ],
  },
  {
    problem_category: "Finding Purpose",
    problem_description: "Discovering meaning and purpose in life",
    philosophical_insights: [
      {
        sloka: "Chapter 2, Verse 47",
        speaker: "Lord Krishna",
        sanskrit:
          "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते संगोऽस्त्वकर्मणि॥",
        translation:
          "You have the right to perform your prescribed duties, but you should not be attached to the outcomes. Do not consider yourself solely responsible for the results, and do not give up performing your duties.",
      },
      {
        sloka: "Chapter 18, Verse 46",
        speaker: "Lord Krishna",
        sanskrit:
          "यत्तु कामेप्सुना कर्म साहङ्कारेण वा पुनः। क्रियते बहुलायासं तद्राजसं निबध्यते॥",
        translation:
          "But actions performed with a selfish desire, or with egoistic motives, or with excessive effort, are declared to be in the mode of passion, and they bind the performer.",
      },
    ],
  },
  {
    problem_category: "Overcoming Fear",
    problem_description: "Conquering fears and insecurities",
    philosophical_insights: [
      {
        sloka: "Chapter 2, Verse 40",
        speaker: "Lord Krishna",
        sanskrit:
          "नेहाभिक्रमनाशोऽस्ति प्रत्यवायो न विद्यते। स्वल्पमप्यस्य धर्मस्य त्रायते महतो भयात्॥",
        translation:
          "In this endeavor, there is no loss or diminution, and a little advancement on this path can protect one from the most dangerous type of fear.",
      },
      {
        sloka: "Chapter 4, Verse 42",
        speaker: "Lord Krishna",
        sanskrit:
          "तस्मात्त्वमुत्तिष्ठ यशो लभस्व जित्वा शत्रून् भुङ्क्ष्व राज्यं समृद्धम्। मयैवैते निहताः पूर्वमेव निमित्तमात्रं भव सव्यसाचिन्॥",
        translation:
          "Therefore, arise with determination, O Arjuna, and conquer your enemies. Enjoy the prosperous kingdom. Verily, they are already destroyed by My arrangement, and you, O Savyasachin, can be but an instrument in the fight.",
      },
    ],
  },
  {
    problem_category: "Finding Inner Peace",
    problem_description: "Attaining inner tranquility and peace",
    philosophical_insights: [
      {
        sloka: "Chapter 6, Verse 20",
        speaker: "Lord Krishna",
        sanskrit:
          "यत्रोपरमते चित्तं निरुद्धं योगसेवया। यत्र चैवात्मनात्मानं पश्यन्नात्मनि तुष्यति॥",
        translation:
          "When the mind is completely restrained through the practice of yoga, and one's consciousness is focused within, the self becomes contented in the self by the self.",
      },
      {
        sloka: "Chapter 6, Verse 27",
        speaker: "Lord Krishna",
        sanskrit:
          "प्रशान्तमनसं ह्येनं योगिनं सुखमुत्तमम्। उपैति शान्तरजसं ब्रह्मभूतमकल्मषम्॥",
        translation:
          "The yogi whose mind is peaceful, whose passions are pacified, and who is free from sin, attains the supreme bliss of union with the Brahman.",
      },
    ],
  },
  {
    problem_category: "Emotional Healing",
    problem_description: "Healing from emotional pain and trauma",
    philosophical_insights: [
      {
        sloka: "Chapter 10, Verse 20",
        speaker: "Lord Krishna",
        sanskrit:
          "अहं वृष्णीनां वासुदेवोऽस्मि पाण्डवानां धनञ्जयः। मुनीनामप्यहं व्यासः कवीनामुशना कविः॥",
        translation:
          "Of the Vrishnis, I am Vasudeva, and of the Pandavas, I am Arjuna. Of the sages, I am Vyasa, and among poets, I am Usana (Shukracharya).",
      },
      {
        sloka: "Chapter 10, Verse 34",
        speaker: "Lord Krishna",
        sanskrit:
          "मृत्युः सर्वहरश्चाहमुद्भवश्च भविष्यताम्। कीर्तिः श्रीर्वाक्च नारीणां स्मृतिर्मेधा धृतिः क्षमा॥",
        translation:
          "I am all-devouring death, and I am the origin of future beings. Among women, I am fame, fortune, speech, memory, intelligence, steadfastness, and forgiveness.",
      },
    ],
  },
  {
    problem_category: "Spiritual Growth",
    problem_description: "Nurturing spiritual growth and enlightenment",
    philosophical_insights: [
      {
        sloka: "Chapter 9, Verse 22",
        speaker: "Lord Krishna",
        sanskrit:
          "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते। तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥",
        translation:
          "To those who constantly engage in worshipping Me with exclusive devotion, I ensure the procurement of all their necessities and the preservation of their assets.",
      },
      {
        sloka: "Chapter 18, Verse 66",
        speaker: "Lord Krishna",
        sanskrit:
          "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज। अहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
        translation:
          "Abandon all varieties of dharma and simply surrender unto Me alone. I shall liberate you from all sinful reactions. Do not fear.",
      },
    ],
  },
  {
    problem_category: "Time Management",
    problem_description: "Effectively managing time and priorities",
    philosophical_insights: [
      {
        sloka: "Chapter 10, Verse 33",
        speaker: "Lord Krishna",
        sanskrit:
          "अक्षराणामकारोऽस्मि द्वन्द्वः सामासिकस्य च। अहमेवाक्षयः कालो धाताऽहं विश्वतोमुखः॥",
        translation:
          "Among letters, I am the letter 'A', and among compound words, I am the dual compound. I am indeed eternal time, the creator and destroyer of all, and I am the omniscient and omnipresent.",
      },
      {
        sloka: "Chapter 16, Verse 21",
        speaker: "Lord Krishna",
        sanskrit:
          "त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः। कामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत्॥",
        translation:
          "There are three gates leading to the hell of self-destruction for the soul: lust, anger, and greed. Therefore, one should give up these three.",
      },
    ],
  },
  // Add more problem categories and their respective verses.
  // ...
];

module.exports = data;
