import { useSetState, useDebouncedValue, useViewportSize } from "@mantine/hooks";
import { useState, Fragment, useContext, useEffect, useRef } from "react";
import WorksList from "@/config/work";
import Vibrant from "node-vibrant";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import { SetSectionChosenContext } from "@/pages";
import Scrollbar from 'smooth-scrollbar';
import style from "@/styles/pages/subpages/work.module.css";

// nextjs image
import Image from "next/image";
import ImageLoader from "@/util/ImageLoader";

const defaultHexIfProminentInvalid: string = "#121112";

export default function Works(props?: { active: boolean }) {
  const [worksProminentColor, setWPC] = useSetState<Record<number, string>>({});
  const [workSelection, setWorkSelection] = useState<number | null>(null);
  const [debouncedWorkSelectionForOpeningTransition] = useDebouncedValue(workSelection, 50);
  const [debouncedWorkSelectionForTransitionAfterClosing] = useDebouncedValue(workSelection, 400);
  const resetMenu = useContext(SetSectionChosenContext);

  const workListRef = useRef<HTMLDivElement>(null);
  const [workListScrollHeight, setWorkListScrollHeight] = useState<number>(0);

  const workPieceContainerRefs = useRef<HTMLDivElement[]>([]);
  const workPieceImagesRefs = useRef<HTMLDivElement[]>([]);

  const {width: windowWidth} = useViewportSize();

  useEffect(() => {
    workPieceContainerRefs.current.forEach((container, index) => {
      const getParallaxScale = (scrollHeight: number, elementTop: number, nextElementHeight: number, maxScale: number) => {
        // Calculate the effective scroll height within the relevant range
        const effectiveScrollHeight = Math.max(0, Math.min((scrollHeight - elementTop) + (index === 0 ? 0 : 500), (nextElementHeight - elementTop) + 500));
        // console.log(index, effectiveScrollHeight);
      
        // Calculate progress within the transition range (0 to 1)
        const progress = effectiveScrollHeight / (nextElementHeight - elementTop);
      
        // Scale based on eased progress and maxScale
        const scale = 1 + (progress * (maxScale - 1));
      
        return scale;
      };

      const parallaxNumber = getParallaxScale(
        workListScrollHeight, 
        container.offsetTop, 
        workPieceContainerRefs.current?.[index + 1]?.offsetTop || workListRef?.current?.scrollHeight || 0,
        1.25
      );

      workPieceImagesRefs.current[index].style.transform = `scale(${parallaxNumber})`;
    });
  }, [workListScrollHeight]);

  useEffect(() => {
    setWPC({});

    workPieceImagesRefs.current = [];

    workPieceContainerRefs.current = [];
  }, [props?.active]);
  
  useEffect(() => {
    if (workListRef?.current) {
      const scrollbar = Scrollbar.init(workListRef.current, {
        damping: 0.05,
      });
  
      scrollbar.addListener(({ offset }) => setWorkListScrollHeight(offset.y));
    };

    return () => {
      if (Scrollbar && workListRef?.current) {
        Scrollbar.destroy(workListRef.current);
      };
    };
  }, []);

  return (
    <section className={style.work} data-active={props?.active || false}>
      <div className={style.close_button}>
        {/* @ts-expect-error */}
        <IconArrowLeft color={"white"} size={64} strokeWidth={1.125} onClick={() => resetMenu(null)} />
      </div>

      {/* title/description */}
      <section className={style.info}>
        <div className={style.title}>
          <h1>Work</h1>
        </div>

        <div className={style.desc}>
          <p>This is a full list of my hard work. I think that's it?</p>
        </div>
      </section>

      {/* list of my work */}
      <section className={style.rightside}>
        {/* preview of my workpieces */}
        <section className={style.preview} data-active={workSelection !== null} data-show={debouncedWorkSelectionForOpeningTransition !== null}>
          {
            (workSelection !== null || debouncedWorkSelectionForTransitionAfterClosing !== null) && (
              <Fragment>
                {
                  (() => {
                    const debouncedWorkSelection = workSelection !== null ? workSelection : (debouncedWorkSelectionForTransitionAfterClosing !== null ? debouncedWorkSelectionForTransitionAfterClosing : null);
                    if (debouncedWorkSelection === null) return;

                    const work = WorksList[debouncedWorkSelection];

                    const prominentedColor = worksProminentColor?.[debouncedWorkSelection] || defaultHexIfProminentInvalid;

                    const getTextColor = (backgroundColor: string) => {
                      // Convert the background color to RGB values
                      const rgb = backgroundColor?.match(/\d+/g)?.map(Number);
                      if (!rgb) return "black";

                      // Calculate the brightness using the formula (R * 299 + G * 587 + B * 114) / 1000
                      const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;

                      // Choose black or white based on the brightness
                      return brightness > 128 ? "black" : "white";
                    };

                    const constractedDynamicTextColor = getTextColor(prominentedColor);

                    return (
                      <section className={style.prevbox} style={{ background: worksProminentColor?.[debouncedWorkSelection] || defaultHexIfProminentInvalid }}>
                        <div className={style.close_button}>
                          <IconArrowLeft color={"white"} size={64} strokeWidth={1.125} onClick={() => setWorkSelection(null)} />
                        </div>

                        {/* embed */}
                        {
                          typeof work?.embedURL === "string" && (
                            <div className={style.embed}>
                              <iframe src={work.embedURL} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                            </div>
                          )
                        }

                        <div className={style.prevboximage}>
                          <Image
                            loader={ImageLoader} fill={true}
                            src={work.imageURL.startsWith("https") ? work.imageURL : "/images/workpiece/" + WorksList[debouncedWorkSelection].imageURL}
                            loading={"eager"}
                            alt={`An image of a work named, "${work.name}"`}
                            onLoad={(evt) => evt.currentTarget.classList.add(style.loaded)}
                          />

                          <span className={style.gradient} style={{
                            background: `linear-gradient(to bottom, transparent, ${prominentedColor})`
                          }} />
                        </div>

                        <div className={style.prevboxinfo}>
                          <div className={style.text} style={{ color: constractedDynamicTextColor }}>
                            {/* abandon type below workpiece name */}
                            {
                              typeof work?.abandonedType === "string" && (
                                <div className={style.abandon}>
                                  <p>{work.abandonedType}</p>
                                </div>
                              )
                            }

                            <h1>{work.name}</h1>

                            <p>{work.description}</p>
                          </div>

                          {
                            !work?.abandonedType && (
                              <div className={style.button} onClick={() => window.open(work.url, "_blank")} style={{ color: constractedDynamicTextColor, borderColor: constractedDynamicTextColor }}>
                                <p>Visit</p>

                                <div className={style.arrow}>
                                  <IconArrowRight size={32} strokeWidth={1.5} />
                                </div>
                              </div>
                            )
                          }
                        </div>
                      </section>
                    )
                  })()
                }
              </Fragment>
            )
          }
        </section>

        {/* list of my workpieces */}
        <div className={style.list} ref={workListRef}>
          {
            WorksList.map((work, index) => {
              return (
                <div 
                  // @ts-expect-error
                  ref={(el) => workPieceContainerRefs.current[index] = el}

                  className={style.workpiece} key={index} onClick={() => setWorkSelection(index)}>

                  {/* image of the workpiece, like a preview */}
                  <div className={style.image}>
                    <Image
                      crossOrigin={"anonymous"}
                      loader={ImageLoader} fill={true}

                      // @ts-expect-error
                      ref={(el) => workPieceImagesRefs.current[index] = el}

                      src={work.imageURL.startsWith("https") ? work.imageURL : "/images/workpiece/" + work.imageURL}
                      loading={"lazy"}
                      alt={`An image of a work named, "${work.name}"`}
                      onLoad={async (event) => {
                        event.currentTarget.classList.add(style.loaded);

                        const getPalette = await Vibrant.from(event.currentTarget).getPalette();

                        setWPC({ [index]: getPalette?.DarkMuted?.hex || getPalette?.DarkVibrant?.hex || getPalette?.Vibrant?.hex || defaultHexIfProminentInvalid });
                      }}
                    />
                  </div>

                  <div className={style.name}>
                    <h1>{work.name}</h1>
                  </div>
                </div>
              );
            })
          }
        </div>
        { }
      </section>
    </section>
  );
};