import RestaurantTemplate from './RestaurantTemplate';
import { BusinessData } from '@/lib/types';
type Props = { business: BusinessData };
export default function RestaurantWarmthTemplate({ business }: Props) {
  return <RestaurantTemplate business={business} />;
}
