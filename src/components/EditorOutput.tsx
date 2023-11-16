import dynamic from "next/dynamic";
import Image from "next/image";
import React, { FC } from "react";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  {
    ssr: false,
  }
);

interface EditorOutputProps {
  content: any;
}

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
};
// using custom renderers because the default one has trouble with images, and displaying custom code
const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (
    <Output
      data={content}
      style={style}
      className="text-sm"
      renderers={renderers}
    />
  );
};

function CustomCodeRenderer({ data }: any) {
  return (
    <pre className="p-4 bg-gray-800 rounded-md">
      <code className="text-sm text-gray-100">{data.code}</code>
    </pre>
  );
}

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;
  return (
    <div className="relative w-full min-h-[15rem]">
      <Image alt="image" className="object-contain" fill src={src} />
    </div>
  );
}

export default EditorOutput;
