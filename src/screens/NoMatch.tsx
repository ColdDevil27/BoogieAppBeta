import { useState } from 'react';
import { medication } from '../data';
import { lookup } from '../lib/lookup';
import { saveWish } from '../lib/nav';
import Topbar from '../components/Topbar';
import { IconClipboard, IconPlus, IconQuestion, IconScan } from '../components/Icons';

export default function NoMatch({ query }: { query: string }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const name = query || 'this';
  const result = query ? lookup(query) : { type: 'none' as const };
  const suggestions = result.type === 'suggest' ? result.entries : [];
  const question = `I take ${medication.brandName} (${medication.genericName}). Is it okay to take ${name} with it?`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(question);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const addWish = () => {
    if (query) setSaved(saveWish(query));
  };

  return (
    <>
      <Topbar />
      <div className="page">
        <div>
          <div className="eyebrow-sm">{medication.brandName} with</div>
          <h1 className="title">{query || 'Something else'}</h1>
        </div>

        {suggestions.length > 0 && (
          <section>
            <h2 className="label">Did you mean</h2>
            <div className="chips">
              {suggestions.map((e) => (
                <a key={e.id} className="chip" href={`#/check/${e.id}`}>
                  <span className={`dot ${e.severity}`} aria-hidden="true" />
                  {e.name}
                </a>
              ))}
            </div>
          </section>
        )}

        <section className="unknown">
          <div className="verdicthead">
            <span className="unknownbadge">
              <IconQuestion />
            </span>
            <span className="verdictlabel">NOT CHECKED YET</span>
          </div>
          <h2>Not on our list yet. That doesn't mean it's safe.</h2>
          <p>We haven't reviewed this against {medication.brandName}. Treat it as unknown until you've checked.</p>
        </section>

        <section>
          <h2 className="label">Ways to check it</h2>
          <div className="actions">
            <button className="action" disabled>
              <span className="medicon sm">
                <IconScan />
              </span>
              <span className="grow">
                <span className="steptitle block">Scan the label</span>
                <span className="muted small block">Coming soon: we'll check each active ingredient.</span>
              </span>
            </button>

            <div className="card actioncard">
              <div className="actionhead">
                <span className="medicon sm">
                  <IconClipboard />
                </span>
                <div className="grow">
                  <h3 className="steptitle">Ask your pharmacist</h3>
                  <p className="muted small">It's free, quick, and they see all your medicines.</p>
                </div>
              </div>
              <p className="quote">"{question}"</p>
              <button className="primary" onClick={copy}>
                {copied ? 'Copied' : 'Copy question'}
              </button>
            </div>

            <button className="action" onClick={addWish} disabled={!query || saved}>
              <span className="medicon sm">
                <IconPlus />
              </span>
              <span className="grow">
                <span className="steptitle block">{saved ? 'Saved on this device' : 'Save it for later'}</span>
                <span className="muted small block">Keeps a list of things to review or ask about.</span>
              </span>
            </button>
          </div>
        </section>

        <footer className="footer">
          <p>MySSRI never shows a green result for something it hasn't reviewed. Information only, not medical advice.</p>
        </footer>
      </div>
    </>
  );
}
