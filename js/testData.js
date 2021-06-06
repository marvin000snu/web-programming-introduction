/**
 * testData.js
 * This is an example or test material for the presentation on April 28th.
 * You can change it anytime!
 */

const testPeopleData = [
  { name: "박상혁", party: "더불어민주당" },
  { name: "김성주", party: "더불어민주당" },
  { name: "김정호", party: "더불어민주당" },
  { name: "김철민", party: "더불어민주당" },
  { name: "민형배", party: "더불어민주당" },
  { name: "박정", party: "더불어민주당" },
  { name: "서영석", party: "더불어민주당" },
  { name: "신동근", party: "더불어민주당" },
  { name: "어기구", party: "더불어민주당" },
  { name: "이정문", party: "더불어민주당" },
  { name: "진성준", party: "더불어민주당" },
  { name: "흥기원", party: "더불어민주당" },
];

const testTextParagraph =
  "현행법은 300세대 이상 공동주택의 관리주체는 매년 1회 이상 외부 회계감사를 의무적으로 받도록 하고, 300세대 미만인 공동주택으로서 의무관리대상 공동주택의 관리주체는 입주자등의 10분의 1 이상이 연서하여 요구하거나 입주자대표회의에서 의결하여 요구한 경우 외부 회계감사를 받도록 규정하고 있음.\n" +
  "그러나, 공동주택 관리비 집행 등 회계의 투명성에 관한 문제가 지속적으로 발생하고 있어 공동주택 회계관리의 투명성을 제고하기 위해 외부 회계감사 대상을 현행 300세대 이상 공동주택에서 의무관리대상 공동주택 전체로 확대해야 할 필요성이 제기되고 있음.\n" +
  "또한, 공동주택의 회계관리가 자의적으로 운영되거나 관리비등이 부정하게 집행되는 등 목적 외로 사용되는 것을 방지하기 위해서는 입주자대표회의 구성원에게 공동주택 회계처리 기준 등 전반에 대한 지식과 이를 위한 교육이 필요하다는 지적이 제기되고 있음.\n" +
  "이에 입주자대표회의 구성원에 대한 교육 사항에 공동주택 회계처리에 관한 사항을 추가하고, 외부 회계감사의 대상을 의무관리대상 공동주택으로 확대하여 적용하되 비용부담과 입주자의 선택권 등을 감안하여 외부 회계감사 면제요건을 300세대를 기준으로 세분화하고, 회계감사 결과를 제출받은 시장ㆍ군수ㆍ구청장은 필요한 경우 회계감사에 대한 감리를 대통령령으로 정하는 회계감사 및 감리에 관한 전문성을 갖춘 법인이나 단체에 요청할 수 있도록 함으로써 공동주택 회계관리의 투명성을 제고하고 공동주택의 회계관리에서 나타난 문제점을 개선하려는 것임(안 제17조제2항제4호의2 신설 등).\n";

export const testLawData = [
  {
    id: "0",
    title: "공동주택관리법 일부개정법률안",
    summary: "공동주택, 회계관리, 회계감사에 대한 법률안이에요.",
    whoCreate: testPeopleData,
    where: "국토교통관리위원회",
    when: "2021 - 04 - 05 제안",
    status: "위원회 심사",
    isCompleted: false,
    text: testTextParagraph,
  },
  {
    id: "1",
    title: "부동산 거래신고 등에 관한 법률 일부개정법률안",
    whoCreate: testPeopleData,
    where: "국토교통관리위원회",
    when: "2021 - 04 - 05",
    summary: "공동주택, 회계관리, 회계감사",
    status: "공포",
    isCompleted: true,
    text: testTextParagraph,
  },
  {
    id: "2",
    title: "자원의 절약과 재활용촉진에 관한 법률 일부개정법률안",
    whoCreate: testPeopleData,
    where: "국토교통관리위원회",
    when: "2021 - 04 - 05",
    summary: "공동주택, 회계관리, 회계감사",
    status: "위원회 심사",
    isCompleted: false,
    text: testTextParagraph,
  },
];

export const testVoteResult = {
  agree: 200,
  disagree: 35,
  abstention: 3,
  absence: 62,
};
