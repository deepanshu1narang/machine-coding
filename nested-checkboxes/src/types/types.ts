interface CheckboxInterface {
  id: number;
  label: string;
  checked: boolean;
  indeterminate: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface NodeInterface {
  id: number;
  parentId: null | number;
  label: string;
  checked: boolean;
  children: NodeInterface[];
}

export type { CheckboxInterface, NodeInterface };
