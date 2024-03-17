type AbandonType = "Discontinued" | "Under Construction";


type WorkProp = Record<"name" | "description" | "url" | "imageURL", string> & {
  abandonedType?: AbandonType
  embedURL?: string;
  type: WorkType;
};

