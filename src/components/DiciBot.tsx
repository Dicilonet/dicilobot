
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useTranslation } from 'react-i18next';
import { LoadingSpinnerIcon, CloseIcon, DiciBotIcon } from './icons';

const DICILO_KNOWLEDGE_BASE = `
### BASE DE CONOCIMIENTO DE DICILO.NET ###

---
SECCIÓN 0: INFORMACIÓN CLAVE DE LA EMPRESA
---
- Marca: Dicilo es una marca de MILENIUM HOLDING & CONSULTING UG.
- Dirección: Mühlendamm 84a, 22087 Hamburg.
- Contacto General: Teléfono: 015678710511, E-Mail: info@dicilo.net.
- Marketing: Los usuarios pueden obtener cupones y ofertas en redes sociales. Colaboramos con socios nacionales e internacionales.

---
SECCIÓN 1: PREGUNTAS FRECUENTES (ALEMÁN)
---
Was ist Dicilo.net? Dicilo.net ist eine digitale Plattform, die Käufer und Verkäufer durch ein Ökosystem von Produkten und Dienstleistungen verbindet. Mit innovativen Tools, KI-Unterstützung und einer breiten Reichweite hilft Dicilo.net Unternehmen, ihre Produkte effizient zu vermarkten, während Verbraucher Zugang zu hochwertigen, empfohlenen Produkten erhalten.
Wie kann ich mich bei Dicilo.net registrieren? Die Registrierung ist einfach: Besuchen Sie unsere Website und wählen Sie zwischen den Profiloptionen Käufer, Verkäufer, Endkunde oder Spender. Nach der Anmeldung wird für Verkäufer eine Landingpage erstellt, auf der ihre Produkte oder Dienstleistungen präsentiert werden. Käufer können direkt mit Verkäufern interagieren und von personalisierten Angeboten profitieren.
Welche Abonnementpläne bietet Dicilo.net an? Dicilo.net bietet vier Hauptpläne: Einzelkunde (persönlicher Gebrauch), Einzelhändler (kleine Unternehmen), Großhändler (größere Unternehmen), Spender (Nutzer, die Produkte verschenken). Jeder Plan umfasst spezifische Funktionen wie Produktregistrierung, Marketing-Tools und Statistiken.
Welche Vorteile habe ich als Verkäufer auf Dicilo.net? Verkäufer können bis zu 600 Produkte in 18 Hauptkategorien registrieren, KI-gestützte Marketing-Tools nutzen, Zugang zu Statistiken und Kursen erhalten, und ihre Produkte in Empfehlungsnewslettern bewerben.
Wie erhalte ich die Angebote auf Dicilo.net? Endkunden erhalten zweimal im Monat personalisierte Empfehlungsnewsletter. Geschäftskunden erhalten zwei Newsletter mit Statistiken und Plattform-Updates.
Kann ich auf Dicilo.net Produkte verschenken? Ja, registrieren Sie sich unter der Kategorie „Spender“. Nach Genehmigung wird Ihr Angebot veröffentlicht und erreicht Bedürftige.
Wie funktioniert der technische Support auf Dicilo.net? Dicilo.net bietet E-Mail-Support (Mo.–Fr.) und für Premium-Nutzer individuellen Support (Mo.–Sa.). Ein KI-Assistent ist in Entwicklung und wird bald verfügbar sein.
Wie erfolgt die Lieferung der gekauften Produkte? Die Lieferdetails werden direkt zwischen Käufer und Verkäufer vereinbart. Dicilo.net bietet Unterstützung bei der Kommunikation.
Ist ein Abonnement erforderlich, um Dicilo.net zu nutzen? Grundfunktionen sind kostenlos. Für erweiterte Tools und Rabatte ist ein kostenpflichtiges Abonnement erforderlich.
Wie kann ich mein Geschäft auf Dicilo.net erweitern? Nutzen Sie Dicilo.net, um Ihre Reichweite zu maximieren, Zielgruppen präzise anzusprechen und durch Statistiken und Marketing-Tools strategische Entscheidungen zu treffen.
Auf welchen sozialen Netzwerken ist Dicilo.net aktiv? WhatsApp, Telegram, Instagram, Facebook, TikTok, LinkedIn, Twitter (X), YouTube, Pinterest und Twitch.
Welche Vorteile bietet der KI-Assistent von Dicilo.net? Rund-um-die-Uhr-Support, Produktvorschläge basierend auf Kundenpräferenzen, interaktive Funktionen wie Terminplanung und Beratung.
Welche Arten von Marketing-Tools gibt es? Social-Media-Posts, Empfehlungsnewsletter, Grafiken und Inhalte zur Markenstärkung, Analysen zur Optimierung von Kampagnen.
Gibt es Rabatte für jährliche Mitgliedschaften? Ja, Rabatte von 5 % bis 15 % je nach Plan.
Kann ich meine Produkte in mehreren Kategorien registrieren? Ja, in bis zu 18 Hauptkategorien.
Wie funktioniert der Empfehlungsmechanismus? Nutzer bewerten und empfehlen Produkte. Diese Empfehlungen fließen in Newslettern ein.
Kann Dicilo.net Unternehmen bei der Expansion in neue Märkte unterstützen? Ja, durch gezielte Werbung und soziale Netzwerke.
Welche Statistiken erhalte ich als Geschäftskunde? Monatliche Berichte zur Performance, Reichweite und Interaktion.
Kann Dicilo.net auch Start-ups unterstützen? Ja, mit erschwinglichen Plänen, Schulungen und strategischem Support.
Wie sicher sind die Transaktionen? Sehr sicher, durch strenge Überprüfungsprozesse und die Zusammenarbeit mit vertrauenswürdigen Unternehmen.

---
SECCIÓN 2: MANUSCRITO DIGITAL (ESPAÑOL)
---
1. Introducción: Dicilo es una plataforma para conectar con servicios innovadores y experiencias de viaje, hospedaje y tecnología.
2. Historia y Filosofía: Simplifica la búsqueda de servicios. Conecta con experiencias turísticas (Sonora Tours, Tropical Caribbean Tour), tecnología (Hörcomfort) y hospitalidad (Hotel Sueños). Filosofía: personalización y accesibilidad.
3. Servicios: Turismo Personalizado (Sonora Tours en México, Tropical Caribbean Tour en el Caribe, Inviajes en Latinoamérica), Hospitalidad Premium (Hotel Sueños), Soluciones Auditivas (Hörcomfort), Tecnología de Vanguardia (Travel Posting para bloggers).
4. Beneficios: Plataforma Integral, Personalización, Innovación, Soporte Multilingüe (español, inglés, alemán), Accesibilidad Global.
5. ¿Por Qué Elegir Dicilo?: Facilidad de Uso, Seguridad, Precios Competitivos.
7. ¿Qué Encuentras en Dicilo?: Tours Exclusivos, Reservas Hoteleras, Tecnología Auditiva, Consejos de Viaje, Servicios Especializados.
8. Testimonios: Positivos de clientes de México, Alemania y Colombia.
Ventajas para Usuarios Privados: Productos Exclusivos, Precios Inmejorables, Confianza y Seguridad, Ahorro de Tiempo, Comunidad Activa.
Ventajas para Empresas: Mayor Visibilidad, Acceso a Nuevos Mercados, Recomendaciones Auténticas, Modelos de Suscripción Flexibles (BASIC y BUSINESS), Publicidad Dirigida, Innovación, Alianzas.
Valores: Honestidad, Transparencia, Flexibilidad, Innovación Continua con IA.

---
SECCIÓN 3: PREGUNTAS FRECUENTES EXTENDIDAS (ESPAÑOL)
---
1. ¿Qué es Dicilo.net? Plataforma digital que conecta compradores y vendedores con herramientas de IA.
2. Registro: En Dicilo.net, eligiendo perfil (comprador, vendedor, cliente final, donante).
3. Planes de suscripción: Cliente individual, Minorista, Mayorista, Donante.
4. Beneficios como vendedor: Registrar hasta 600 productos, usar marketing IA, acceder a estadísticas, promoción en boletines.
5. Recepción de ofertas: Clientes finales reciben boletines 2 veces al mes; clientes comerciales, mensualmente.
6. Regalar productos: Sí, con el perfil "Donante".
7. Soporte técnico: Correo electrónico (L-V), soporte premium (L-S), y próximamente asistente IA 24/7.
8. Entrega de productos: Acuerdo directo entre comprador y vendedor.
9. Suscripción necesaria: No para funciones básicas, sí para avanzadas.
10. Expansión de negocio: A través de alcance global, campañas dirigidas y análisis de datos.
11. Redes sociales activas: WhatsApp, Telegram, Instagram, Facebook, TikTok, LinkedIn, X (Twitter), YouTube, Pinterest, Twitch.
12. Beneficios del asistente de IA: Disponibilidad 24/7, recomendaciones personalizadas, funciones interactivas.
13. Herramientas de marketing: Publicaciones en redes sociales, boletines, gráficos personalizados, análisis de campañas.
14. Descuentos anuales: Sí, entre 5% y 15%.
15. Registro en múltiples categorías: Sí, hasta en 18.
16. Mecanismo de recomendaciones: Usuarios califican y recomiendan, influyendo en otros compradores.
17. Ayuda a expandirse a nuevos mercados: Sí, con publicidad dirigida y estrategias de redes sociales.
18. Estadísticas para clientes comerciales: Informes mensuales de rendimiento, alcance e interacción.
19. Apoyo a startups: Sí, con planes accesibles y capacitación.
20. Seguridad en transacciones: Prioridad máxima con procesos de verificación estrictos.

---
SECCIÓN 4: AVISO LEGAL (IMPRESSUM)
---
- Angaben gemäß § 5 TMG
- Entidad: Dicilo es eine Marke der; Milenium Holding & Consulting UG – Group.
- Dirección: Mühlendamm 84a, 22087 Hamburg
- Handelsregister: HRB 171236, Registergericht: Hamburg
- Representante: Nilo Escolar
- Contacto: Telefon: 015678710511, E-Mail: info@dicilo.net
- Umsatzsteuer-ID (VAT ID): DE323288362
- Redacción: Nilo Escolar
- EU-Streitschlichtung (Resolución de disputas de la UE): La Comisión Europea proporciona una plataforma para la resolución de litigios en línea (OS): https://ec.europa.eu/consumers/odr/.
- No participamos en procedimientos de resolución de disputas ante una junta de arbitraje de consumidores.

---
SECCIÓN 5: POLÍTICA DE PRIVACIDAD (DATENSCHUTZERKLÄRUNG)
---
- **Responsable de datos:** Nilo Escolar, Mühlendamm 84a, 22087 Hamburg.
- **Recopilación de datos:** Los datos se recopilan cuando los usuarios los proporcionan (por ejemplo, formularios de contacto) o automáticamente por sistemas de TI (datos técnicos como el navegador).
- **Uso de datos:** Para garantizar el funcionamiento sin errores del sitio web y para analizar el comportamiento del usuario.
- **Derechos del usuario:** Derecho a la información, rectificación, supresión, limitación del tratamiento, portabilidad de los datos y derecho de oposición y reclamación ante una autoridad de control.
- **Hosting:** Usamos Mittwald CM Service GmbH & Co. KG.
- **Herramientas de terceros:** Usercentrics para la gestión del consentimiento, WhatsApp para comunicación, Calendly y Google Calendar para agendar citas.
- **Redes sociales:** Se utilizan plugins de Facebook, X (Twitter), Instagram, LinkedIn, Pinterest. La interacción con estos plugins puede transferir datos a dichas plataformas.
- **Newsletter:** Se utiliza Brevo (Sendinblue GmbH) para el envío y análisis de newsletters.
- **Seguridad:** Se utiliza cifrado SSL/TLS para proteger la transmisión de datos.
`;

type Message = {
    sender: 'user' | 'bot' | 'error';
    text: string;
};

export const DiciBot: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const isApiAvailable = !!(typeof process !== 'undefined' && process.env && process.env.API_KEY);

    useEffect(() => {
        if (isOpen) {
            setMessages([{ sender: 'bot', text: t('dicibot.greeting') }]);
        }
    }, [isOpen, t]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !isApiAvailable) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            
            const systemInstruction = `Eres DiciBot, un asistente de IA amigable y servicial para el sitio web Dicilo.net. Tu único propósito es responder a las preguntas de los usuarios sobre Dicilo, sus servicios, beneficios y funcionamiento, basándote ESTRICTAMENTE en la información proporcionada en la 'BASE DE CONOCIMIENTO DE DICILO.NET'. No inventes información ni respondas sobre temas no relacionados con Dicilo. Sé conciso y directo. Responde siempre en el idioma de la pregunta del usuario (${i18n.language}). La base de conocimiento está en alemán y español; úsala para responder en el idioma del usuario. \n\n${DICILO_KNOWLEDGE_BASE}`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: input,
                config: {
                    systemInstruction: systemInstruction,
                }
            });

            const botMessage: Message = { sender: 'bot', text: response.text };
            setMessages(prev => [...prev, botMessage]);

        } catch (err) {
            console.error("DiciBot error:", err);
            const errorMessage: Message = { sender: 'error', text: t('dicibot.error') };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-emerald-600 text-white w-16 h-16 rounded-3xl shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300 z-40 animate-pulse-shadow"
                aria-label="Open DiciBot"
            >
                <DiciBotIcon className="text-4xl" />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 bg-gray-800 text-white rounded-t-2xl">
                        <div className="flex items-center gap-3">
                            <DiciBotIcon className="w-8 h-8"/>
                            <h3 className="font-bold text-lg">DiciBot</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">
                            <CloseIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start items-start'}`}>
                                    {msg.sender !== 'user' && (
                                      <div className="w-8 h-8 rounded-full flex-shrink-0">
                                        <DiciBotIcon className="text-emerald-600" />
                                      </div>
                                    )}
                                    <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
                                        msg.sender === 'bot' ? 'bg-emerald-100 text-gray-800 rounded-bl-none' :
                                        msg.sender === 'user' ? 'bg-emerald-600 text-white rounded-br-none' :
                                        'bg-red-100 text-red-700 rounded-bl-none'
                                    }`}>
                                        <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-start gap-2">
                                    <div className="w-8 h-8 rounded-full flex-shrink-0">
                                        <DiciBotIcon className="text-emerald-600" />
                                    </div>
                                    <div className="px-4 py-2 rounded-2xl bg-emerald-100 text-gray-800 rounded-bl-none">
                                        <LoadingSpinnerIcon className="h-5 w-5 text-emerald-600" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t bg-white rounded-b-2xl">
                        {isApiAvailable ? (
                            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={t('dicibot.placeholder')}
                                    className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-500 bg-white text-gray-900"
                                    disabled={isLoading}
                                />
                                <button type="submit" disabled={isLoading || !input.trim()} className="bg-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 disabled:bg-gray-400">
                                    <i className="fa-solid fa-paper-plane"></i>
                                </button>
                            </form>
                        ) : (
                            <p className="text-center text-sm text-red-600">{t('hero.ai_unavailable')}</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
