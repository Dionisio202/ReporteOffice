import { useState } from "react";
import { FormatSelector } from "./components/FormatSelector";
import { EmailInput } from "./components/EmailInput";
import FileViewer from "./components/FileViewer";
interface Formats {
  solicitud: boolean;
  datos: boolean;
}

export default function WebPage() {
  const [selectedFormats, setSelectedFormats] = useState<Formats>({
    solicitud: true,
    datos: false,
  });

  const handleCheckboxChange = (format: keyof Formats) => {
    setSelectedFormats((prev) => ({
      ...prev,
      [format]: !prev[format],
    }));
  };

  return (
    <div className="flex flex-col w-full h-screen p-4 bg-gray-200">
      {/* Container for FormatSelector and DocumentViewer */}
      <div className="flex flex-col md:flex-row mt-4 gap-4">
        {/* FormatSelector in the left column */}
        <div className="md:w-1/2">
          <FormatSelector
            selectedFormats={selectedFormats}
            onCheckboxChange={handleCheckboxChange}
          />
          {/* EmailInput below FormatSelector */}
          <EmailInput />
        </div>

        {/* DocumentViewer in the right column */}
        <div className="md:w-1/2 md:pl-0">
        <FileViewer/>
        </div>
      </div>
    </div>
  );
}
