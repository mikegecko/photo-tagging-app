import imgJ from "../images/junk.png";
import {
  TransformComponent,
  TransformWrapper,
} from "@pronestor/react-zoom-pan-pinch";

export default function PhotoPage() {
    const obj = {disabled:false, velocityDisabled: false};
  return (
    <div className="images">
        <TransformWrapper initialPositionX={0}
        initialPositionY={0}
        initialScale={1}
        limitToBounds={false}
        panning={obj}  
        minScale={0.8}      
        >
          <TransformComponent>
            <img src={imgJ} alt="Stuff" />
          </TransformComponent>
        </TransformWrapper>
    </div>
  );
}
