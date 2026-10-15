import { medication } from '../data';
import { IconChevronLeft, IconPill } from './Icons';

export default function Topbar() {
  return (
    <div className="topbar">
      <a className="back" href="#/">
        <IconChevronLeft />
        Back
      </a>
      <span className="medpill">
        <IconPill width={16} height={16} />
        {medication.brandName}
      </span>
    </div>
  );
}
