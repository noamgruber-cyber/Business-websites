import GymTemplate from './GymTemplate';
import { BusinessData } from '@/lib/types';
type Props = { business: BusinessData };
export default function GymFireTemplate({ business }: Props) {
  return <GymTemplate business={business} />;
}
