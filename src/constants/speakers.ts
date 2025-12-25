import type { Speaker } from '@/types/event';
import chris_park from '@/assets/speaker/chris_park.jpg';
import linuxer from '@/assets/speaker/linuxer.png';
import sonu_kim_sl from '@/assets/speaker/sonu_kim_sl.jpg';
import sonu_kim_co from '@/assets/speaker/sonu_kim_co.png';
import zerone from '@/assets/speaker/zerone.png';
import subin_kim from '@/assets/speaker/subin_kim.png';
import dongil_kim from '@/assets/speaker/dongil_kim.png';
import jiyoung_lee from '@/assets/speaker/jiyoung_lee.png';
import yanso from '@/assets/speaker/yanso.png';
import seungho_song from '@/assets/speaker/seungho_song.jpg';
import byoungho_lee from '@/assets/speaker/byoungho_lee.png';
import woody_kwon from '@/assets/speaker/woody_kwon.jpg';
import sinsky from '@/assets/speaker/sinsky.png';

export const SPEAKERS: Speaker[] = [
  {
    id: 'speaker-1',
    name: '박상운',
    org: 'Serverless Hero',
    bio: 'AI기반 3D컨텐츠를 연구하는 스타트업의 Dev Lead이자 AWS Serverless Hero입니다. Serverless를 좋아하여 최대한 많은 문제를 Serverless로 풀어보고 있습니다. 특히 AI시대에 Serverless의 장점이 훨씬 커지고 있어 기대하는 마음으로 Serverless의 다양한 활용을 연구중입니다.',
    profileImage: chris_park,
  },
  {
    id: 'speaker-2',
    name: '소성운',
    org: 'AI Hero',
    bio: '-',
    profileImage: yanso,
  },
  {
    id: 'speaker-3',
    name: '신재현',
    org: 'Community Hero',
    bio: '-',
    profileImage: sinsky,
  },
  {
    id: 'speaker-4',
    name: '정태환',
    org: 'Operation CB',
    bio: 'AWS 자격증 소모임에서 활동하며 올스타 입니다.',
    profileImage: linuxer,
  },
  {
    id: 'speaker-5',
    name: '김선우',
    org: 'Serverless CB',
    bio: '일본에서 AWS 서버리스 기술 지원을 제공하는 스타트업을 운영하고 있습니다.',
    profileImage: sonu_kim_sl,
  },
  {
    id: 'speaker-6',
    name: '정영진',
    org: 'Operation CB',
    bio: 'AWS 기반으로 펼쳐지는 다양한 영역의 Cloud 기반 설계, 운영 등 노하우를 여러 커뮤니티에 알리고자 활동하고 있는 DevOps Engineer 입니다. 커뮤니티를 통해 아는 노하우를 많은 분들에게 알려드리고, 또 배우는 선순환을 만들어나가고자 노력하고 있습니다.',
    profileImage: zerone,
  },
  {
    id: 'speaker-7',
    name: '김수빈',
    org: 'DevTools CB',
    bio: 'AWS의 다양한 서비스와 커뮤니티를 좋아하고 즐겁게 활동하고 있습니다. 업무에서는 플랫폼 엔지니어링을 하고자 노력하고 있습니다.',
    profileImage: subin_kim,
  },
  {
    id: 'speaker-8',
    name: '김동일',
    org: 'Serverless CB',
    bio: 'AWS 기반으로 스마트 교육 상품을 운영하고 있는 엔지니어입니다. 커뮤니티를 통해 상호 많은 인사이트를 주고 받는 모임을 만들기 위해 노력하고 있습니다. 네트워킹을 사랑합니다.',
    profileImage: dongil_kim,
  },
  {
    id: 'speaker-9',
    name: '김선우',
    org: 'Container CB',
    bio: 'KT Cloud에서 AWS를 기반으로 한 Cloud Native + Devops 과정 강사를 담당하고 있습니다.',
    profileImage: sonu_kim_co,
  },
  {
    id: 'speaker-10',
    name: '이지영',
    org: 'Security CB',
    bio: 'AWS 보안 소모임 오거나이저를 담당하고 있고, 놀유니버스에서 보안 아키텍트로 근무하고 있습니다.',
    profileImage: jiyoung_lee,
  },
  {
    id: 'speaker-11',
    name: '송승호',
    org: 'AI Engineering CB',
    bio: 'AWS AI-Engineering 운영을 함께 맡고 있습니다.',
    profileImage: seungho_song,
  },
  {
    id: 'speaker-12',
    name: '권성환',
    org: 'DB CB',
    bio: '올리브영에서 TPM, DevRel, Tech. Writer, 사업지원 역할자들과 함께 하는 테크전략지원팀에서 일하고 있습니다. AWS 오거나이저 은퇴를 앞둔 올드비이기도 합니다. AWS 데이터, 을지로 소모임 오거나이저와 CB을 해왔습니다.',
    profileImage: woody_kwon,
  },
  {
    id: 'speaker-13',
    name: '이병호',
    org: 'Container CB',
    bio: '핸디소프트에서 개발과 DevOps영역을 담당하고 있습니다.',
    profileImage: byoungho_lee,
  },
];
