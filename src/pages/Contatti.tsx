import { useState, type FormEvent } from 'react';
import { Clock, Instagram, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import MappaConsenso from '../components/ui/MappaConsenso';
import usePageMeta from '../hooks/usePageMeta';
import { immagini, servizi, studio, team } from '../data/site';
import { NOTA_WHATSAPP, emailUrl, messaggi, oggetti, whatsappUrl } from '../lib/contatto';

export default function Contatti() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [servizio, setServizio] = useState('');
  const [messaggio, setMessaggio] = useState('');
  const [consenso, setConsenso] = useState(false);
  /*
   * Acceso dopo il tentativo di invio via email. Serve perché quel passaggio
   * può fallire in silenzio: su un computer senza programma di posta
   * configurato — chi usa Gmail dal browser, cioè moltissimi — il clic non
   * produce nulla di visibile, e si resta a fissare lo schermo convinti di
   * aver scritto. Il riquadro che compare dice cosa sta succedendo e offre
   * WhatsApp a chi non vede aprirsi niente.
   */
  const [inviato, setInviato] = useState(false);

  usePageMeta(
    'Contatti — FisioEVA | Via di Boccea 755, Roma',
    'Prenota una visita allo studio FisioEVA in Via di Boccea 755, Roma Casalotti. Telefono, email, orari e mappa per raggiungerci.'
  );

  /*
   * Non c'è un backend: la richiesta non passa dai nostri server, viene
   * composta qui e parte dal programma di posta o da WhatsApp di chi scrive.
   * Il contenuto è lo stesso nei due casi — cambia solo il mezzo — quindi si
   * compone una volta sola.
   */
  const componiRichiesta = () =>
    [
      `Nome: ${nome}`,
      `Email: ${email}`,
      telefono && `Telefono: ${telefono}`,
      servizio && `Trattamento di interesse: ${servizio}`,
      '',
      messaggio,
    ]
      .filter(Boolean)
      .join('\n');

  const inviaEmail = (e: FormEvent) => {
    e.preventDefault();
    window.location.href = emailUrl(
      `Richiesta appuntamento — ${nome || 'Sito FisioEVA'}`,
      componiRichiesta()
    );
    setInviato(true);
  };

  /*
   * La stessa richiesta su WhatsApp. Non è un ripiego: è il canale che la
   * maggior parte delle persone usa già, e toglie di mezzo il passaggio che
   * faceva perdere più richieste — dopo aver compilato il modulo bisognava
   * premere invia una seconda volta dentro il programma di posta, e chi non
   * se ne accorgeva credeva di aver scritto senza averlo fatto.
   *
   * Non è un `submit`: i campi obbligatori valgono per l'email, mentre una
   * chat si può aprire anche con due righe e finire di raccontare di là. Il
   * consenso invece serve in entrambi i casi, ed è il motivo per cui questo
   * pulsante resta spento finché non è spuntato.
   */
  const inviaWhatsApp = () => {
    window.open(
      whatsappUrl(`${messaggi.contatti}\n\n${componiRichiesta()}`),
      '_blank',
      'noopener,noreferrer'
    );
  };

  const inputClass =
    'w-full bg-white border border-gray-200 rounded-2xl px-5 py-3.5 text-sm text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-colors';

  return (
    <>
      <PageHero
        eyebrow="Contatti"
        title={
          <>
            Prenota la tua <span className="text-brand-primary">visita</span>
          </>
        }
        subtitle="Siamo in Via di Boccea 755, a Roma. Scrivici o chiamaci per fissare insieme il primo appuntamento."
        breadcrumb="Contatti"
        image={immagini.sedeIllustrazione}
      />

      <section className="relative bg-brand-light py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-brand-primary text-xs tracking-widest uppercase font-medium">
                Dove trovarci
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-dark leading-tight mb-10">
              A due passi <span className="text-brand-primary">da te</span>
            </h2>

            <div className="space-y-4">
              <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-7 shadow-xl border border-white flex items-start gap-5">
                <span className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </span>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Indirizzo</p>
                  <p className="font-sans font-bold text-brand-dark text-lg">{studio.address}</p>
                  <p className="text-gray-600 font-light">
                    {studio.city} ({studio.zone})
                  </p>
                </div>
              </div>

              {/* Il numero dello studio, non i cellulari delle professioniste:
                  quelli stanno sui biglietti da visita. */}
              <a
                href={studio.phoneHref}
                className="group bg-white/80 backdrop-blur-md rounded-[2rem] p-6 shadow-xl border border-white flex items-center gap-5 hover:shadow-2xl transition-shadow duration-300"
              >
                <span className="w-12 h-12 rounded-2xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6" />
                </span>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Telefono</p>
                  <p className="font-sans font-medium text-brand-dark group-hover:text-brand-secondary transition-colors">
                    {studio.phone}
                  </p>
                </div>
              </a>

              {/* Stesso numero del telefono: chi preferisce scrivere invece di
                  chiamare trova la chat già aperta, col messaggio pronto. */}
              <a
                href={whatsappUrl(messaggi.contatti)}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/80 backdrop-blur-md rounded-[2rem] p-6 shadow-xl border border-white flex items-center gap-5 hover:shadow-2xl transition-shadow duration-300"
              >
                <span className="w-12 h-12 rounded-2xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-6 h-6" />
                </span>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">WhatsApp</p>
                  <p className="font-sans font-medium text-brand-dark group-hover:text-brand-secondary transition-colors">
                    Scrivici su WhatsApp
                  </p>
                </div>
              </a>

              <a
                href={emailUrl(oggetti.contatti)}
                className="group bg-white/80 backdrop-blur-md rounded-[2rem] p-6 shadow-xl border border-white flex items-center gap-5 hover:shadow-2xl transition-shadow duration-300"
              >
                <span className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
                  <p className="font-sans font-medium text-brand-dark group-hover:text-brand-secondary transition-colors break-all">
                    {studio.email}
                  </p>
                </div>
              </a>

              <a
                href={studio.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/80 backdrop-blur-md rounded-[2rem] p-6 shadow-xl border border-white flex items-center gap-5 hover:shadow-2xl transition-shadow duration-300"
              >
                <span className="w-12 h-12 rounded-2xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Instagram className="w-6 h-6" />
                </span>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Instagram</p>
                  <p className="font-sans font-medium text-brand-dark group-hover:text-brand-secondary transition-colors">
                    @{studio.instagram}
                  </p>
                </div>
              </a>

              <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-7 shadow-xl border border-white flex items-start gap-5">
                <span className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </span>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Orari</p>
                  <ul className="space-y-2">
                    {studio.orari.map((o) => (
                      <li key={o.giorno} className="flex justify-between gap-4 text-sm">
                        <span className="text-gray-600 font-light">{o.giorno}</span>
                        <span className="text-brand-dark font-medium whitespace-nowrap">
                          {o.ore}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="bg-brand-dark rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-[40%] -right-[20%] w-[70%] h-[120%] rounded-full bg-brand-primary/20 blur-[100px]"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-brand-primary text-xs tracking-widest uppercase font-medium">
                    Scrivici
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-sans font-light text-white leading-tight mb-3">
                  Raccontaci <span className="text-brand-primary font-medium">cosa ti succede</span>
                </h2>
                <p className="text-gray-400 font-light text-sm leading-relaxed mb-8">
                  Compila i campi e scegli come farceli arrivare: su WhatsApp o per email. In
                  entrambi i casi il messaggio è già pronto e niente passa dai nostri server —
                  parte dal tuo telefono e arriva allo studio.
                </p>

                <form onSubmit={inviaEmail} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      required
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Nome e cognome *"
                      aria-label="Nome e cognome"
                      className={inputClass}
                    />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email *"
                      aria-label="Email"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="Telefono"
                      aria-label="Telefono"
                      className={inputClass}
                    />
                    <select
                      value={servizio}
                      onChange={(e) => setServizio(e.target.value)}
                      aria-label="Trattamento di interesse"
                      className={`${inputClass} ${servizio ? 'text-brand-dark' : 'text-gray-400'}`}
                    >
                      <option value="">Trattamento di interesse</option>
                      {servizi.map((s) => (
                        <option key={s.slug} value={s.titolo}>
                          {s.titolo}
                        </option>
                      ))}
                      <option value="Non lo so ancora">Non lo so ancora</option>
                    </select>
                  </div>

                  <textarea
                    required
                    rows={5}
                    value={messaggio}
                    onChange={(e) => setMessaggio(e.target.value)}
                    placeholder="Di cosa hai bisogno, da quanto tempo e cosa vorresti tornare a fare *"
                    aria-label="Messaggio"
                    className={`${inputClass} resize-none`}
                  />

                  {/* Consenso esplicito e separato dall'invio: il messaggio può
                      contenere dati sulla salute (art. 9 GDPR), e per quelli una
                      casella già spuntata o un consenso implicito nel clic non
                      valgono nulla. */}
                  <label className="flex cursor-pointer items-start gap-3 pt-1">
                    <input
                      required
                      type="checkbox"
                      checked={consenso}
                      onChange={(e) => setConsenso(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-brand-primary"
                    />
                    <span className="text-xs font-light leading-relaxed text-gray-400">
                      Ho letto l'
                      <Link
                        to="/privacy"
                        className="text-brand-primary underline underline-offset-2"
                      >
                        informativa privacy
                      </Link>{' '}
                      e acconsento al trattamento dei miei dati — comprese le eventuali
                      informazioni sulla salute che scelgo di scrivere qui — per essere
                      ricontattato. *
                    </span>
                  </label>

                  {/* WhatsApp per primo, ed è voluto: è la strada più breve.
                      L'email resta sotto per chi la preferisce — o per chi non
                      ha WhatsApp, che è una ragione sufficiente da sola. */}
                  <button
                    type="button"
                    onClick={inviaWhatsApp}
                    disabled={!consenso}
                    className="group w-full flex items-center justify-center gap-3 bg-brand-secondary text-white hover:bg-white hover:text-brand-dark rounded-full px-8 py-4 transition-colors duration-300 font-medium text-sm disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-gray-500 disabled:hover:bg-white/15 disabled:hover:text-gray-500"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Invia su WhatsApp</span>
                  </button>

                  <button
                    type="submit"
                    disabled={!consenso}
                    className="group w-full flex items-center justify-center gap-3 border-2 border-white/30 text-white hover:bg-white hover:text-brand-dark rounded-full px-8 py-4 transition-colors duration-300 font-medium text-sm disabled:cursor-not-allowed disabled:border-white/10 disabled:text-gray-500 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                  >
                    <span>Invia per email</span>
                    <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  {/*
                    Compare solo dopo il tentativo via email, e non dice "inviato":
                    da qui non possiamo saperlo. Dice cosa dovrebbe succedere e
                    cosa fare se non succede — che è il caso di chi legge la posta
                    dal browser e non ha un programma di posta configurato.
                  */}
                  {inviato && (
                    <div
                      role="status"
                      className="rounded-2xl border border-brand-primary/40 bg-white/10 p-5 text-sm font-light leading-relaxed text-gray-200"
                    >
                      Si sta aprendo il tuo programma di posta con il messaggio già scritto:
                      controlla che sia partito, perché l'invio avviene da lì.
                      <br />
                      <br />
                      Non si è aperto niente?{' '}
                      <button
                        type="button"
                        onClick={inviaWhatsApp}
                        className="font-medium text-brand-primary underline underline-offset-2"
                      >
                        Mandacelo su WhatsApp
                      </button>{' '}
                      oppure chiamaci allo{' '}
                      <a
                        href={studio.phoneHref}
                        className="font-medium text-brand-primary underline underline-offset-2"
                      >
                        {studio.phone}
                      </a>
                      .
                    </div>
                  )}

                  <p className="text-gray-500 text-xs font-light leading-relaxed">
                    Usiamo quello che scrivi solo per risponderti. {NOTA_WHATSAPP}
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* La mappa non parte da sola: vedi MappaConsenso. */}
      <section className="relative">
        <MappaConsenso />
      </section>
    </>
  );
}
