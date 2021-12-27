import { useSetBaseImage, useSetCanvasToBaseImage } from "../hooks";

export default function FabricCanvas () {
  useSetBaseImage();
  useSetCanvasToBaseImage();

  return null;
};
