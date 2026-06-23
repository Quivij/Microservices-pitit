import React, { useRef } from "react";

type OTPInputProps = {
  length: number;
  value: string[];
  onChange: (val: string[]) => void;
};

export default function OTPInput({ length, value, onChange }: OTPInputProps) {
  const refs = useRef<HTMLInputElement[]>([]);

  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    
    // Lấy ký tự cuối cùng nếu lỡ nhập đè nhiều ký tự
    if (val.length > 1) {
      val = val.slice(-1);
    }

    const newValue = [...value];
    newValue[i] = val;
    onChange(newValue);

    if (val && i < length - 1) {
      // Dùng setTimeout để tránh lỗi bàn phím điện thoại tự nhảy đúp chữ vào ô tiếp theo
      setTimeout(() => {
        refs.current[i + 1]?.focus();
      }, 10);
    }
  };

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  return (
    <div className="d-flex gap-2 justify-content-center">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            if (el) refs.current[i] = el;
          }}
          className="form-control text-center"
          style={{ width: 48 }}
          inputMode="numeric"
          maxLength={1}
          value={value[i] ?? ""}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKey(i, e)}
        />
      ))}
    </div>
  );
}
