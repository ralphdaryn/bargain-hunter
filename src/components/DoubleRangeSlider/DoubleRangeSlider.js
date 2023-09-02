import Slider from "rc-slider";
import "./DoubleRangeSlider.scss";

const DoubleRangeSlider = ({ value, onChange }) => {
  return (
    <div className="double-range-slider">
      <Slider.Range
        min={0}
        max={100}
        defaultValue={value}
        onChange={onChange}
      />
    </div>
  );
};

export default DoubleRangeSlider;
