import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import CustomDialog from './Dialog';
const backgroundImage = ['PPKN/vecteezy_torn-note-paper-background-for-element-design_13442939%201-1.png' ,
  'PPKN/vecteezy_torn-note-paper-background-for-element-design_13442939%201.png' , 'PPKN/vecteezy_torn-note-paper-background-for-element-design_13442939%202-1.png','PPKN/vecteezy_torn-note-paper-background-for-element-design_13442939%202-2.png'
  ,'PPKN/vecteezy_torn-note-paper-background-for-element-design_13442939%202-3.png','PPKN/vecteezy_torn-note-paper-background-for-element-design_13442939%202.png','paper.png']
const CurvedLine = ({ x1, y1, x2, y2 }) => {
  const controlPointX1 = (x1 + x2) / 2;
  const controlPointY1 = y1;
  const controlPointX2 = (x1 + x2) / 2;
  const controlPointY2 = y2;
  const pathData = `M ${x1},${y1} C ${controlPointX1},${controlPointY1} ${controlPointX2},${controlPointY2} ${x2},${y2}`;

  return (
    <svg style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }}>
      <path d={pathData} stroke="black" strokeWidth="3" fill="none" />
    </svg>
  );
};

const App = () => {
  const isImage = (path) => {
    return /\.(png|jpg|jpeg|gif)$/i.test(path);
  };
  const [open , setOpen] = useState(false);
  const [positions, setPositions] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [flipped, setFlipped] = useState(new Array(10).fill(false)); // Adjust array length
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [cardDimensions, setCardDimensions] = useState([]);
  const [cardBackgrounds, setCardBackgrounds] = useState([]);
  
  const openDialog = () => setOpen(true)
  const closeDialog = () => setOpen(false)
  const getRandomBackgroundImage = () => {
    const randomIndex = Math.floor(Math.random() * backgroundImage.length);
    return backgroundImage[randomIndex] ;
  };
  
  const handleMouseDown = (e, index) => {
    setIsDragging(true);
    setDraggingIndex(index);
    setOffset({
      x: e.clientX - e.currentTarget.getBoundingClientRect().left,
      y: e.clientY - e.currentTarget.getBoundingClientRect().top,
    });
  };
  
  const handleLogPositions = () => {
    console.log('Box positions:', positions);
    console.log("Card Backgrounds :" , cardBackgrounds)
  };

  const handleMouseMove = (e) => {
    if (isDragging && draggingIndex !== null) {
      const updatedPositions = [...positions];
      updatedPositions[draggingIndex] = {
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      };
      setPositions(updatedPositions);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingIndex(null);
  };

  const handleCardClick = (index) => {
    setFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index]; // Toggle the flipped state
      return newFlipped;
    });
  };

  const boxRefs = useRef([]);
  const [lineCoordinates, setLineCoordinates] = useState([]);

  const desc = [
    {
      back: [1, 2],
      frontText: 'pngwing.com.png',
      backText: 'Proses perumusan pancasila',
    },
    {
      back: [0],
      frontText: 'SIDANG BPUPKI',
      backText: `BPUPKI Dibentuk pada 29 April 1945 , anggota  dilantik pada tanggal 28 MEI 1945.sidang BPUPKI membahas rumusan dasar negara Indonesia Merdeka dan Rancangan Undang Undang dasar,`,
    },
    {
      back: [0],
      frontText: 'SIDANG PPKI',
      backText: 'Dibentuk pada 8 Agustus 1945 , ppki dibenutk untuk melanjutkan tugas BPUPKI , mempersiapkan kemerdekaan dan pengesahan pembukan undang undang dasar yang mengandung pancasila',
    },
    {
      back: [1],
      frontText: 'BPUPKI 1',
      backText: 'Berlangsung pada 29 Mei - 1 Juni 1945 untuk membahas rumusan negara Indonesia  ',
    },
    {
      back: [3],
      frontText: 'Gagasan mengenai dasar negara Indonesia',
      backText: 'Beberapa tokoh menyampaikan gagasannya mengenai dasar negara',
    },
    {
      back: [1],
      frontText: 'BPUPKI 2',
      backText: 'Berlangsung pada 10 - 17 Juli 1945 , panitia perancang undang undang  membahas penyusunan rancangan undang undang dasar',
    },
    {
      back: [4],
      frontText: 'MOH YAMIN',
      backText: 'Mr. Mohammad Yamin mendapat kesempatan yang pertama untuk mengemukakan pikirannya tentang dasar negara , dan disampaikan dalam bentuk pidato dan tertulis dalam rancangan undang undang',
    },
    {
      back: [4],
      frontText: 'SOEPOMO',
      backText: `1. Persatuan\n2. Kekeluargaan\n3. Keseimbangan lahir dan batin\n4. Musyawarah\n5. Keadilan Rakyat`,
    },
    {
      back: [4],
      frontText: 'SOEKARNO',
      backText: `1. Nasionalisme dan kebangsaan Indonesia\n2. Internasionalisme atau Perkemanusiaan\n3. Mufakat atau Demokrasi\n4. Kesejahteraan sosial\n5. Ketuhanan yang berkebudayaan`,
    },
    {
      back: [6],
      frontText: 'TERTULIS',
      backText: `1. Ketuhanan yang Maha Esa\n2. Kebangsaan Persatuan Indonesia\n3. Rasa Persatuan yang adil dan beradab\n4. Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyarwaratan/perwakilan\n5. Keadilan sosial bagi seluruh rakyat Indonesia`,
    },
    {
      back: [6],
      frontText: 'LISAN',
      backText: `1. Peri kebangsaan\n2. Peri kemanusiaan\n3. Peri Ketuhanan\n4. Peri Kerakyatan\n5. Kesejateraan Rakyat`,
    },
    {
      back: [3],
      frontText: 'Sidang panitia sembilan',
      backText: `Sidang dilaksanakan pada 22 juni 1945 dan menghasilkan piagam jakarta yang berisi :\n1. Ketuhanan dengan kewajiban menjalankan syariat Islam bagi pemeluknya\n2. Kemanusiaan yang adil dan beradab.\n3. Persatuan Indonesia.\n4. Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan atau perwakilan.\n5. Keadilan sosial bagi seluruh rakyat Indonesia.`,
    },
    {
      back: [5],
      frontText: 'hal yang dihasilkan panitia perancang',
      backText: `Pada 14 juli 1945 Ir Soekarno selaku ketua panitia melapor tiga hal yand dihasilkan panitia  yaitu : 
       1. Pembukaan UUD yang rumusannya diambil dari seluruh isi Piagam Jakarta. 
       2. UUD beserta batang tubuhnya. 
       3. Seluruh anggota BPUPKI menerima dengan bulat hasil kerja Panitia Perancang Undang Undang Dasar yang diketuai oleh Ir.Soekarno`,
    },
    {
      back : [2],
      frontText: 'Penggantian Pembukaan Undang Undang dasar alinea ke 4',
      backText: `Pada 17 Agustus 1945 sore hari ada utusan dari Rakyat Indonesia bagian Timur, yang mengusulkan agar pada alinea keempat Undang Undang dasar , di belakang kata "ketuhanan" yang berbunyi "dengan kewajiban menjalankan
      syariat islam bagi pemeluk pemeluknya" dihapus . Jika tidak rakyat Indonesia akan memishkan dirinya dari NKRI , sehingga kalimat tersebut diganti menjadi "Yang Maha Esa" `,
    },
    {
      back : [2],
      frontText: 'Pengesahan rancangan hukum dasar dengan pembukanya',
      backText: `Terjadi pada tanggal 18 Agustus`,
    }
  ];
  

  useEffect(() => {
    setPositions([
      {
          "x": 904.5,
          "y": 20.546875
      },
      {
          "x": 495.59375,
          "y": 136.640625
      },
      {
          "x": 1423,
          "y": 214.640625
      },
      {
          "x": 90.296875,
          "y": 180.84375
      },
      {
          "x": 220,
          "y": 346.84375
      },
      {
          "x": 1019.140625,
          "y": 252.046875
      },
      {
          "x": 61.046875,
          "y": 552.59375
      },
      {
          "x": 429.34375,
          "y": 563.25
      },
      {
          "x": 776.140625,
          "y": 535.25
      },
      {
          "x": 453.75,
          "y": 725.25
      },
      {
          "x": 63,
          "y": 720
      },
      {
          "x": 642,
          "y": 274
      },
      {
          "x": 1109,
          "y": 397
      },
      {
          "x": 1136,
          "y": 661
      },
      {
          "x": 1528,
          "y": 653
      }
  ]);
  const newBackgrounds = desc.map(() =>getRandomBackgroundImage()
  );
  setCardBackgrounds(newBackgrounds);
  
  }, []);

  useEffect(() => {
    const updateLine = () => {
      const newLineCoordinates = desc
        .map((item, index) => {
          return item.back.map((backIndex) => {
            if (boxRefs.current[backIndex] && boxRefs.current[index]) {
              const box1 = boxRefs.current[backIndex].getBoundingClientRect();
              const box2 = boxRefs.current[index].getBoundingClientRect();
              return {
                x1: box1.left + box1.width / 2,
                y1: box1.top + box1.height / 2,
                x2: box2.left + box2.width / 2,
                y2: box2.top + box2.height / 2,
              };
            }
            return null;
          });
        })
        .flat()
        .filter(coord => coord !== null);
      setLineCoordinates(newLineCoordinates);
    };

    updateLine();
  }, [positions]);

  useEffect(() => {
    const updateCardDimensions = () => {
      const newDimensions = desc.map((_, index) => {
        const element = boxRefs.current[index];
        if (element) {
          
          const frontElement = element.querySelector('.card-front');
          const backElement = element.querySelector('.card-back');
    
          // Create temporary elements to measure text size
          const tempFrontElement = document.createElement('div');
          const tempBackElement = document.createElement('div');
          document.body.appendChild(tempFrontElement);
          document.body.appendChild(tempBackElement);
          tempFrontElement.style.maxWidth = index !=0 ? "330px" : "1000px"; // Set max width
          tempFrontElement.style.visibility = 'hidden';
          tempFrontElement.style.position = 'absolute';
          tempFrontElement.style.padding =  index != 0 ? '40px 20px' : '80px 50px';
          tempFrontElement.style.boxSizing = 'border-box';
          tempFrontElement.style.font = window.getComputedStyle(frontElement).font;
          tempFrontElement.textContent = frontElement.textContent;
          
 // Set max width
          tempBackElement.style.visibility = 'hidden';
          tempBackElement.style.position = 'absolute';
          if(index == 0 || index == 11 ){
            tempBackElement.style.padding = '100px 50px';
          }
          else{
            tempBackElement.style.padding = '60px 10px' ;
          }

          tempBackElement.style.boxSizing = 'border-box';
          tempBackElement.style.font = window.getComputedStyle(backElement).font;
          tempBackElement.textContent = backElement.textContent;
          
          const frontTextWidth = tempFrontElement.offsetWidth;
          const frontTextHeight = tempFrontElement.offsetHeight;
          const backTextWidth = tempBackElement.offsetWidth;
          const backTextHeight = tempBackElement.offsetHeight;
    
          // Remove temporary elements
          document.body.removeChild(tempFrontElement);
          document.body.removeChild(tempBackElement);
    
          // Determine the larger dimension for width and height, apply max width
          return {
            width: Math.min(Math.max(frontTextWidth, backTextWidth), index !=0 ? 330 : 1000), // Apply max width
            height: Math.max(frontTextHeight + 15, backTextHeight + 15),
          };
        }
        return { width: 200, height: 150 }; // Default size if element is not available
      });
      setCardDimensions(prevDimensions => {
        const dimensionsChanged = !newDimensions.every((dim, i) => 
          dim.width === prevDimensions[i]?.width &&
          dim.height === prevDimensions[i]?.height
        );
        return dimensionsChanged ? newDimensions : prevDimensions;
      });
    };
    
    updateCardDimensions();
    window.addEventListener('resize', updateCardDimensions); // Recalculate on window resize

    return () => {
      window.removeEventListener('resize', updateCardDimensions);
    };
  }, [desc]);

  return (

    <div
      style={{ position: 'relative', height: '100vh', width: '100vw' }}
      
    >
      
      <button className="desc" onClick={openDialog}>
       !
      </button>
      <CustomDialog open={open} handClose={closeDialog} ></CustomDialog>
      {desc.map((item, index) => (
        <div
        
          key={index}
          ref={(el) => (boxRefs.current[index] = el)}
          onMouseDown={(e) => handleMouseDown(e, index)}
          onDoubleClick={() => handleCardClick(index)}
          onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
          className={`card ${flipped[index] ? 'flipped' : ''}`}
          style={{
            position: 'absolute',
            top: positions[index]?.y,
            left: positions[index]?.x,
            cursor: 'pointer',
            perspective: '1000px',
            width: cardDimensions[index]?.width || '200px', // Dynamic width
            height: cardDimensions[index]?.height || '150px',
             // Adjust as needed // Dynamic height
          }}
          
        >
          <div className="card-inner" style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            position: 'relative',
          }}>
            <div className="card-front" style={{
              padding: '30px',
              boxSizing: 'border-box',

              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              backgroundImage: `url(${cardBackgrounds[index]})`,
 // Set background image
            backgroundSize: '100% 100%',
              alignItems: 'center',
              textAlign: 'center',
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}>
              {isImage(item.frontText) ? (
                <div style={{
                  width : "50%",
                  height : "100%",
                  backgroundImage: `url(${item.frontText})`,
                  backgroundSize: 'contain',
                  backgroundPosition:'center',
                  backgroundRepeat : 'no-repeat',
                }}>
             
              </div>
            ) : (
              item.frontText
            )}
            </div>
            <div className="card-back" style={{
              padding: '20px',
              boxSizing: 'border-box',
              backgroundImage: `url(${cardBackgrounds[index]})`,
  
 // Set background image

            backgroundSize: '100% 100%',
              overflow: 'hidden',
              backgroundPosition:'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              position: 'absolute',
              width: '100%',
              height: '100%',
              transform: 'rotateY(180deg)',
              fontSize : index === 0 || index == 14  ? '20px' : '12px'
            }}>
            <p className='text'>
              {item.backText}
              </p>
            </div>
          </div>
        </div>
      ))}

      {lineCoordinates.map((line, index) => (
        <CurvedLine
          key={index}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
        />
      ))}
      {/* <button
        onClick={handleLogPositions}
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          padding: '10px',
          backgroundColor: 'lightgrey',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Log Positions
      </button> */}
    </div>
  );
};

export default App;
