import React, { useState, useEffect } from 'react';
import "./App.css"
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';


const RoyalCountdown = () => {
  const { width, height } = useWindowSize();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isComplete, setIsComplete] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  const elegantQuotesForBride = [
    "May Allah gently ease your heart in every new step.",
    "You are held by duaas in every quiet, soft moment.",
    "May your days begin and end in peaceful barakah.",
    "Your soul is wrapped in light, love, and divine calm.",
    "Every heartbeat carries love, every tear is a hidden prayer.",
    "May your journey unfold with Allah's mercy at every turn.",
    "In your softness lives strength, faith, and sacred beauty combined.",
    "Allah chose you for love written before time began.",
    "May your silence be filled with sakoon and sweet duaas.",
    "You are walking into a life Allah perfectly planned."
  ];

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date('2025-08-16T00:00:00').getTime();

    // const targetDate = new Date('2024-01-01T00:00:00').getTime();
    // const targetDate = new Date(Date.now() + 10000).getTime(); // 10 seconds later

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, 1000);

    // Quote rotation
    const quoteTimer = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % elegantQuotesForBride.length);
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(quoteTimer);
    };
  }, []);

  const TimeCard = ({ value, label, icon }) => (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.85) 100%)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(236, 72, 153, 0.2)',
      padding: '32px 24px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      margin: '8px',
      minWidth: '180px',
      transition: 'all 0.3s ease',
    }}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
      }}>
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        color: 'rgba(168, 85, 247, 0.4)',
        fontSize: '20px'
      }}>
        {icon}
      </div>

      <div style={{
        fontSize: window.innerWidth < 768 ? '48px' : '64px',
        fontWeight: '800',
        background: 'linear-gradient(45deg, #a855f7, #ec4899, #f43f5e)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '16px'
      }}>
        {String(value).padStart(2, '0')}
      </div>

      <div style={{
        fontSize: '14px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        color: 'rgba(168, 85, 247, 0.8)',
        marginBottom: '16px'
      }}>
        {label}
      </div>

      <div style={{
        width: '40px',
        height: '2px',
        margin: '0 auto',
        background: 'linear-gradient(90deg, transparent, #a855f7, transparent)',
        borderRadius: '1px'
      }} />
    </div>
  );

  // Floating hearts for decoration
  const FloatingHearts = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 1
    }}>
      {Array.from({ length: 15 }, (_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            color: 'rgba(236, 72, 153, 0.2)',
            fontSize: i % 3 === 0 ? '24px' : '16px',
            animation: `heartFloat 6s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${6 + (i % 3)}s`,
          }}
        >
          ❤️
        </div>
      ))}
      <style jsx>{`
        @keyframes heartFloat {
          0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-25px) rotate(180deg);
            opacity: 0.5;
          }
          100% {
            transform: translateY(0px) rotate(360deg);
            opacity: 0.2;
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
  {
    isComplete && (
      <Confetti
        width={width}
        height={height}
        numberOfPieces={400}
        gravity={0.2}
        recycle={false}
      />
    )
  }

  if (isComplete) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 25%, #f3e8ff 50%, #e0e7ff 75%, #ddd6fe 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden'
      }}> 
      {
          isComplete && (
            <Confetti
              width={width}
              height={height}
              numberOfPieces={1000}
              gravity={0.5}
              recycle={false}
            />
          )
        }

        <FloatingHearts />

        <div style={{ maxWidth: '900px', width: '100%' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            padding: '64px 32px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                width: '100px',
                height: '100px',
                margin: '0 auto 24px',
                background: 'linear-gradient(45deg, #a855f7, #ec4899)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pulse 2s ease-in-out infinite',
                fontSize: '50px'
              }}>
                🎁
              </div>

              <h1 style={{
                fontSize: window.innerWidth < 768 ? '28px' : '40px',
                fontWeight: '800',
                background: 'linear-gradient(45deg, #a855f7, #ec4899, #f43f5e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '24px'
              }}>
                🎁 The Moment Has Arrived ✨
              </h1>

              <h2 style={{
                fontSize: window.innerWidth < 768 ? '20px' : '28px',
                color: '#374151',
                fontWeight: '600',
                marginBottom: '32px'
              }}>
                Dearest Rafiya Bhabhi & Muneera Bhabhi,
              </h2>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', lineHeight: '1.8' }}>


              {/* Main Message */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{
                  fontSize: '24px',
                  color: '#ec4899',
                  fontWeight: '700',
                  marginBottom: '20px'
                }}>
                  💖 Heartfelt Congratulations on Your Nikah Day:
                </h3>
                <div style={{ fontSize: '18px', color: '#4c1d95', marginBottom: '20px', fontWeight: '500' }}>
                  Today marks the beginning of a sacred bond written by Allah long before time began. Your union is a reflection of His perfect wisdom and a sign of His deep love — <strong>two souls, chosen for each other, now walking in the light of barakah and mercy.</strong>
                </div>
                <div style={{ fontSize: '16px', color: '#7c3aed', fontStyle: 'italic', marginBottom: '24px' }}>
                  This day is not just a celebration of love, but of faith, of patience, of duaas quietly whispered and beautifully answered.
                </div>
              </div>
              {/* Quranic Verse */}
              {<div style={{
                marginBottom: '32px',
                padding: '24px',
                background: 'rgba(168, 85, 247, 0.1)',
                borderRadius: '16px',
                border: '1px solid rgba(168, 85, 247, 0.2)'
              }}>
                <div style={{
                  fontSize: '25px',
                  color: '#4c1d95',
                  fontWeight: '600',
                  marginBottom: '10px',
                  fontFamily: 'Noto Naskh Arabic',
                }}>
                  "وَخَلَقْنَاكُمْ أَزْوَاجًا"
                </div>
                <div style={{
                  fontSize: '18px',
                  color: '#7c3aed',
                  fontStyle: 'italic',
                  fontWeight: '500',
                  marginBottom: '8px'
                }}>
                  "And We created you in pairs."
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#8b5cf6',
                  fontWeight: '600'
                }}>
                  — Surah An-Naba (78:8)
                </div>
              </div>}
              {/* Duaa Section */}
              <div style={{
                marginBottom: '32px',
                padding: '24px',
                background: 'rgba(236, 72, 153, 0.1)',
                borderRadius: '16px',
                border: '1px solid rgba(236, 72, 153, 0.2)'
              }}>
                <h3 style={{
                  fontSize: '22px',
                  color: '#be185d',
                  fontWeight: '700',
                  marginBottom: '16px'
                }}>
                  🤲 Duaa from the Heart:
                </h3>
                <div style={{
                  fontSize: '18px',
                  color: '#4c1d95',
                  fontStyle: 'italic',
                  marginBottom: '12px',
                  fontFamily: 'serif'
                }}>
                  "Baarakallahu lakumaa, wa baaraka 'alaykumaa, wa jama'a baynakumaa fee khayr."
                </div>
                <div style={{
                  fontSize: '16px',
                  color: '#7c3aed',
                  fontStyle: 'italic'
                }}>
                  May Allah bless you both, shower His blessings upon you, and unite you in goodness and love.
                </div>
              </div>

              {/* Blessings */}
              <div style={{ marginBottom: '24px', fontSize: '18px', color: '#4c1d95' }}>
                <div style={{ marginBottom: '8px' }}>🌸 May your hearts remain soft, yet strong.</div>
                <div style={{ marginBottom: '8px' }}>🌙 May your home be filled with sakoon, sabr, and smiles.</div>
                <div style={{ marginBottom: '16px' }}>🕊️ May your journey together always lead you closer to Allah and to Jannah.</div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#be185d',
                  marginBottom: '24px'
                }}>
                  Ameen ya Rabbal 'Alameen.
                </div>
              </div>

              {/* Closing */}
              <div style={{
                fontSize: '18px',
                color: '#7c3aed',
                fontWeight: '600',
                fontStyle: 'italic',
                padding: '20px',
                background: 'rgba(124, 58, 237, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(124, 58, 237, 0.2)'
              }}>
                With deep love, gentle pride, and countless duaas — from every heart that holds you ❤️
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginTop: '32px',
              fontSize: '32px'
            }}>
              {['❤️', '⭐', '💎', '✨'].map((icon, i) => (
                <div
                  key={i}
                  style={{
                    color: '#a855f7',
                    animation: `pulse ${2 + i * 0.2}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 25%, #f3e8ff 50%, #e0e7ff 75%, #ddd6fe 100%)',
      padding: '16px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <FloatingHearts />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '32px'
          }}>
            <div style={{
              fontSize: '48px',
              animation: 'pulse 3s ease-in-out infinite'
            }}>✨</div>
            <div style={{
              width: '60px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #fbbf24, transparent)'
            }}></div>
            <div style={{
              fontSize: '48px',
              animation: 'pulse 3s ease-in-out infinite',
              animationDelay: '0.5s'
            }}>✨</div>
          </div>

          <h1 style={{
            fontSize: window.innerWidth < 768 ? '32px' : '48px',
            color: '#4c1d95',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            For Our Beloved
          </h1>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            marginBottom: '24px'
          }}>
            <div style={{
              background: 'linear-gradient(45deg, #a855f7, #ec4899)',
              color: 'white',
              fontWeight: '600',
              fontSize: '18px',
              padding: '8px 24px',
              borderRadius: '50px'
            }}>
              Muneera Bhabhi
            </div>
            <div style={{ fontSize: '24px', color: '#fbbf24' }}>✨</div>
            <div style={{
              background: 'linear-gradient(45deg, #a855f7, #ec4899)',
              color: 'white',
              fontWeight: '600',
              fontSize: '18px',
              padding: '8px 24px',
              borderRadius: '50px'
            }}>
              Rafiya Bhabhi
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', color: '#7c3aed', marginBottom: '8px' }}>
              Something truly magnificent awaits
            </div>
            <div style={{ fontSize: '25px', color: '#8b5cf6' }}>
              August 16, 2025
            </div>
          </div>
        </div>

        {/* Countdown Cards - Two rows of two cards each */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            {/* First row - Days and Hours */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <TimeCard value={timeLeft.days} label="Days" />
              <TimeCard value={timeLeft.hours} label="Hours" />
            </div>

            {/* Second row - Minutes and Seconds */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <TimeCard value={timeLeft.minutes} label="Minutes" />
              <TimeCard value={timeLeft.seconds} label="Seconds" />
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            padding: '48px 32px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '40px',
              color: '#8b5cf6',
              marginBottom: '24px',
              animation: 'pulse 2s ease-in-out infinite'
            }}>💎</div>

            <div
              key={currentQuote}
              style={{
                fontSize: window.innerWidth < 768 ? '18px' : '20px',
                color: '#4c1d95',
                fontStyle: 'italic',
                fontWeight: '400',
                lineHeight: '1.8',
                minHeight: '4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'fadeIn 0.8s ease-out',
                marginBottom: '32px'
              }}
            >
              "{elegantQuotesForBride[currentQuote]}"
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '24px'
            }}>
              {elegantQuotesForBride.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: index === currentQuote
                      ? 'linear-gradient(45deg, #a855f7, #ec4899)'
                      : 'rgba(168, 85, 247, 0.3)',
                    transform: index === currentQuote ? 'scale(1.3)' : 'scale(1)',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>

            <div style={{
              fontSize: '16px',
              color: '#7c3aed',
              textAlign: 'center',
              fontWeight: '400',
              lineHeight: '1.6'
            }}>
              Each passing moment brings us closer to celebrating the extraordinary women
              who make our family complete.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoyalCountdown;