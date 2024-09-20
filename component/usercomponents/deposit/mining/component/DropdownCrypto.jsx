"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IconCircleCaretDown } from "@tabler/icons-react";

const DropdownCrypto = ({ setMiningPlan, crypto }) => {
  const [position, setPosition] = React.useState("bottom");

  const cryptoPlans = () => {
    return crypto.map((item, i) => (
      <DropdownMenuRadioItem
        key={i}
        value={item}
        onClick={() => setMiningPlan(item)}
      >
        {item}
      </DropdownMenuRadioItem>
    ));
  };

  return (
    <div className="bg-gray-200">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="border border-neutral-800 flex items-center justify-center"
            variant="outline"
          >
            <span> Select a Crypto to Mine</span>
            <IconCircleCaretDown className="w-4 h-4 ml-3 text-neutral-800 mt-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {/* <DropdownMenuLabel> </DropdownMenuLabel> */}
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            {/* <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem> */}
            {cryptoPlans()}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default DropdownCrypto;
