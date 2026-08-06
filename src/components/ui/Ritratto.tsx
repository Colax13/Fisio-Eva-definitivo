import type { Persona } from '../../content/team';

/**
 * Accenti del ritratto. `acqua` e `lilla` sono i toni con cui il contenuto
 * descrive le persone; qui diventano i colori della palette originale.
 */
const accenti = {
  acqua: {
    ring: 'ring-brand-secondary',
    soft: 'bg-brand-secondary/10',
    ink: 'text-brand-secondary-ink',
  },
  lilla: {
    ring: 'ring-brand-primary',
    soft: 'bg-brand-primary/10',
    ink: 'text-brand-primary-ink',
  },
};

export const accentoDi = (persona: Persona) => accenti[persona.accento];

/** Due lettere dal nome, saltando il titolo. */
const iniziali = (nome: string) =>
  nome
    .replace('Dott.ssa ', '')
    .replace('Dott. ', '')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

type Props = {
  persona: Persona;
  size?: 'grande' | 'piccolo';
};

/**
 * Ritratto tondo con anello colorato e stacco dal fondo.
 * Senza foto mostra le iniziali: finché non arriva lo shooting la card resta
 * piena e composta, invece di aprire un buco al centro del layout.
 */
export default function Ritratto({ persona, size = 'grande' }: Props) {
  const a = accenti[persona.accento];
  const dim = size === 'grande' ? 'h-40 w-40' : 'h-24 w-24';
  const testo = size === 'grande' ? 'text-4xl' : 'text-2xl';

  const anello = `rounded-full ring-4 ${a.ring} ring-offset-4 ring-offset-white transition-transform duration-500 group-hover:scale-105`;

  if (persona.foto) {
    return (
      <img
        src={persona.foto}
        alt={`Ritratto di ${persona.nome}`}
        className={`${dim} ${anello} object-cover`}
      />
    );
  }

  return (
    <div
      className={`${dim} ${anello} ${a.soft} ${a.ink} flex items-center justify-center font-bold ${testo}`}
      role="img"
      aria-label={`Ritratto non ancora disponibile di ${persona.nome}`}
    >
      {iniziali(persona.nome)}
    </div>
  );
}
