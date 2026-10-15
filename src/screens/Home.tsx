import { FormEvent, useState } from 'react';
import { entries, groups, medication } from '../data';
import { lookup } from '../lib/lookup';
import { go } from '../lib/nav';
import { IconCheck, IconChevronRight, IconPill, IconSearch, IconWarn, IconX } from '../components/Icons';

export default function Home() {
  const [q, setQ] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    const result = lookup(term);
    if (result.type === 'match') go(`/check/${result.entry.id}`);
    else go(`/not-found?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="page">
      <div className="brand">
        <span className="logo">
          <IconPill width={20} height={20} />
        </span>
        <span className="wordmark">MySSRI</span>
      </div>

      <section className="card medcard">
        <span className="medicon">
          <IconPill width={24} height={24} />
        </span>
        <div className="grow">
          <div className="eyebrow">Checking against</div>
          <div className="medname">{medication.brandName}</div>
          <div className="muted">
            {medication.genericName} · {medication.drugClass}
          </div>
        </div>
      </section>

      <h1 className="hero">Is it safe with {medication.brandName}?</h1>

      <form onSubmit={onSubmit} role="search">
        <label htmlFor="q" className="label">
          Food, drink or medicine
        </label>
        <div className="searchbox">
          <IconSearch className="searchicon" stroke="#5A5F7A" />
          <input
            id="q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Try ibuprofen or alcohol"
            autoComplete="off"
            autoCapitalize="none"
          />
        </div>
      </form>

      <a className="textlink" href="#/not-found">
        Can't find it? See what to do
        <IconChevronRight width={16} height={16} />
      </a>

      <section>
        <h2 className="label">Often asked</h2>
        <div className="chips">
          {entries.map((e) => (
            <a key={e.id} className="chip" href={`#/check/${e.id}`} aria-label={`${e.name}, ${e.severity}`}>
              <span className={`dot ${e.severity}`} aria-hidden="true" />
              {e.name}
            </a>
          ))}
        </div>
      </section>

      {groups.map((g) => (
        <a key={g.id} className="banner card" href={`#/guide/${g.id}`}>
          <span className="bannericon">
            <IconWarn stroke="#B3261E" />
          </span>
          <span className="grow">
            <span className="bannertitle">{g.title}</span>
            <span className="muted block">Common medicines and supplements to watch</span>
          </span>
          <IconChevronRight stroke="#5A5F7A" />
        </a>
      ))}

      <section>
        <h2 className="label">How to read results</h2>
        <div className="legend">
          <div className="card legenditem">
            <span className="legendicon avoid">
              <IconX width={16} height={16} />
            </span>
            <strong>Avoid</strong>
            <span className="muted small">Serious risk. Ask first.</span>
          </div>
          <div className="card legenditem">
            <span className="legendicon caution">
              <IconWarn width={16} height={16} />
            </span>
            <strong>Caution</strong>
            <span className="muted small">Raises risk. Ask your pharmacist.</span>
          </div>
          <div className="card legenditem">
            <span className="legendicon low">
              <IconCheck width={16} height={16} />
            </span>
            <strong>Low concern</strong>
            <span className="muted small">No known issue.</span>
          </div>
        </div>
      </section>

      <p className="footer center">Information only, not medical advice.</p>
    </div>
  );
}
