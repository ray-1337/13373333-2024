import { useState, createContext, useEffect } from "react";
import { IconMail } from "@tabler/icons-react";
import { useDebouncedValue, useViewportSize } from "@mantine/hooks";
import style from "@/styles/pages/index.module.css";
import hoverStyle from "@/styles/animations/frontpageHoverBlackHole.module.css"

// work pieces
import WorkPieces from "@/subpages/work";

// clickable
const clickableList: Array<Record<"name" | "value", string> & { isURL?: boolean }> = [
  { name: "work", value: "work" }
];

// social media
const sosmedList: Array<{ icon: string | typeof IconMail, url: string }> = [
  { icon: "github", url: "https://github.com/ray-1337" },
  { icon: "instagram", url: "https://instagram.com/37071a" },
  { icon: IconMail, url: "mailto:personal@13373333.one" }
];

export const SetSectionChosenContext = createContext(null);

export default function Main() {
  const [rootShow, setRootShow] = useState<boolean>(false);

  const [sectionHovered, setSectionHovered] = useState<number | null>(null);
  const [sectionChosen, setSectionChosen] = useState<string | null>(null);
  const [debouncedSectionChosen] = useDebouncedValue(sectionChosen, 850);
  const [quickerDebouncedSectionChosenForProps] = useDebouncedValue(sectionChosen, 500);
  const [debouncedSectionChosenForProps] = useDebouncedValue(sectionChosen, 900);

  // biotext transition (eugh)
  const [bioTextState, setBioTextNumberState] = useState<number>(0);

  const {width: windowWidth} = useViewportSize();

  const ContentHoverEasterEgg = (props: { content: string, index: number }) => {
    return (
      <u>
        <b style={{cursor: "default"}} onMouseLeave={() => setContentHoverIndex(null)} onMouseEnter={() => windowWidth > 800 ? setContentHoverIndex(props.index) : undefined}>{props.content}</b>
      </u>
    );
  };

  const [contentHoverIndex, setContentHoverIndex] = useState<number | null>(null);

  const ContentHoverFiller = (props: { index: number | null }) => {
    const redirectToMyCDN = (str: string) => {
      return process.env.NODE_ENV === "production" ? "https://itchi.2024.13373333.one" + str : str;
    };

    return (
      <video autoPlay playsInline disablePictureInPicture disableRemotePlayback loop muted controls={false} preload={"auto"}>
        {/* i do games and shit */}
        { props.index === 1 && <source src={redirectToMyCDN("/videos/frontpage/idogames.480p_wide.reduced.mp4")} type="video/mp4"/> }
      </video>
    );
  };

  useEffect(() => {
    setContentHoverIndex(null);
    setSectionHovered(null);
  }, [sectionChosen]);

  const biography: JSX.Element[] = [
    <>hi. i am <b>ray</b>. 👋</>,
    <>i am an independent full-stack developer</>,
    <>i am currently focusing on mastering video editing and animation.</>,
    <>and, i also do <ContentHoverEasterEgg content={"play games"} index={1}/>, sometimes.</>,
  ];

  useEffect(() => {
    setTimeout(() => {
      const delayShowanceMultiplier: number = 125;

      for (let index = 0; index < biography.length; index++) {
        setTimeout(() => {
          setBioTextNumberState((current) => current + 1);
        }, delayShowanceMultiplier * (index + 1));
      };

      setRootShow(true);
    }, 500);
  }, []);

  return (
    // @ts-expect-error
    <SetSectionChosenContext.Provider value={setSectionChosen}> 
      {/* content hover background */}
      <section className={style["content-hover"]} data-active={sectionChosen === null && contentHoverIndex !== null}>
        <ContentHoverFiller index={contentHoverIndex} />
      </section>

      {/* main/frontpage */}
      <section className={style.frontpage} style={{overflow: sectionChosen !== null ? "hidden" : undefined}} data-show={rootShow}>
        {/* frontpage section */}
        <section className={style.frontier}>
          {/* introduction section */}
          <div className={style.intro} style={{filter: contentHoverIndex !== null ? `invert(1)` : undefined}}>
            <div className={style.skrillex}> { /* running out of classname */}
              <div className={style.text}>
                <p>
                  {
                    biography.map((bio, index) => {
                      return (
                        <span className={style["biotext-root"]} data-show={bioTextState >= (index + 1)} key={index}>
                          <span className={style["biotext"]}>
                            {bio}

                            {
                              (biography.length - 1) !== index && (
                                <> <br/><br/> </>
                              )
                            }
                          </span>
                        </span>
                      );
                    })
                  }
                </p>
              </div>

              {/* clickable stuff */}
              <div className={style.clickable}>
                {
                  clickableList.map((val, index) => {
                    return (
                      <span onMouseEnter={() => setSectionHovered(index)} onMouseLeave={() => setSectionHovered(null)} onClick={() => !val?.isURL ? setSectionChosen(val.value) : undefined} key={index} data-hoverable-effect-1={true}>
                        <u>
                          {/* if its url, use "anchor instead" */}
                          {val?.isURL && <a href={val.value}>{val.name}</a>}

                          {/* otherwise, normal text is fine */}
                          {!val?.isURL && <p>{val.name}</p>}
                        </u>
                      </span>
                    );
                  })
                }
              </div>
            </div>

            {/* clickable stuff, but with icon */}
            <div className={style.icon}>
              {
                sosmedList.map((val, index) => {
                  return (
                    <span key={index}>
                      <a href={val.url} target={"_blank"}>
                        {
                          typeof val.icon === "string" ? (
                            <img src={`https://cdn.simpleicons.org/${val.icon}/black`} alt={val.icon} loading={"eager"}/>
                          ) : (
                            <val.icon/>
                          )
                        }
                      </a>
                    </span>
                  );
                })
              }
            </div>
          </div>

          {/* empty rectangle section */}
          <div className={style.rectangle} data-transition-woop={sectionChosen !== null ? sectionChosen !== null : quickerDebouncedSectionChosenForProps !== null}>
            <div className={style["content-hover-rectangle"]} data-active={sectionChosen === null && contentHoverIndex !== null}>
              <ContentHoverFiller index={contentHoverIndex} />
            </div>

            {/* a special transition when you're hovering "work" page/section */}
            <div className={hoverStyle["transition-section-1"]} data-active={contentHoverIndex === null && sectionHovered === 0}/>
          </div>
        </section>
      </section>

      {/* work pieces */}
      {
        debouncedSectionChosen === "work" && (
          <WorkPieces active={sectionChosen === "work" ? debouncedSectionChosenForProps === "work" : false}/>
        )
      }
    </SetSectionChosenContext.Provider>
  );
};