import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {
  DragHandleButton,
  SideMenu,
  SideMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import {PartialBlock } from "@blocknote/core";

import "@blocknote/core/fonts/inter.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({
  onChange,
  initialContent,
  editable
}: EditorProps ) =>{
  const {resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file
    })
    return response.url
  }

  const editor = useCreateBlockNote({
    initialContent: 
      initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
    uploadFile: handleUpload,
  });

  const handleChange = () => {
    onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
  };

  return (
    <BlockNoteView 
      editor={editor} 
      editable={editable}
      sideMenu={false} 
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onChange={handleChange}
      >
      <SideMenuController
        sideMenu={(props) => (
          <SideMenu {...props}>
            <DragHandleButton {...props} />
          </SideMenu>
        )}
      />
    </BlockNoteView>
  );
}

export default Editor;