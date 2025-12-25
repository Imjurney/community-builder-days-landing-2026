import recapLg from '@/assets/icons/recap_lg.svg';
import insightLg from '@/assets/icons/insight_lg.svg';
import expertLg from '@/assets/icons/expert_lg.svg';
import newYearLg from '@/assets/icons/newYear_lg.svg';

import recapSm from '@/assets/icons/recap_sm.svg';
import insightSm from '@/assets/icons/insight_sm.svg';
import expertSm from '@/assets/icons/expert_lg.svg';
import newYearSm from '@/assets/icons/newYear_sm.svg';

export interface OverviewItem {
  title: string;
  iconLg: string;
  iconSm: string;
}

export const OVERVIEW_ITEMS: OverviewItem[] = [
  {
    title: 'Recap',
    iconLg: recapLg,
    iconSm: recapSm,
  },
  {
    title: 'Insight',
    iconLg: insightLg,
    iconSm: insightSm,
  },
  {
    title: 'Expert',
    iconLg: expertLg,
    iconSm: expertSm,
  },
  {
    title: 'New Year',
    iconLg: newYearLg,
    iconSm: newYearSm,
  },
];
