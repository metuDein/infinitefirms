"use client";

import { useState } from "react";
// import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExpandableCardDemo } from "./profile/components/TransactionTab";
import { useDataContext } from "@component/context/DataProvider";

const HistoryDash = () => {
  const { currentUser, allTransactions, appLoading } = useDataContext();
  const tx = allTransactions.filter(
    (tx) => tx.userId?._id === currentUser?._id
  );

  const SortDropDown = () => {
    const [showStatusBar, setShowStatusBar] = useState(true);
    const [showActivityBar, setShowActivityBar] = useState(false);
    const [showPanel, setShowPanel] = useState(false);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="px-10 border border-solid border-black"
          >
            Sort by:
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {/* <DropdownMenuLabel>Appearance</DropdownMenuLabel> */}
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
            disabled
          >
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}
          >
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  if (appLoading) {
    return <div className="text-black">Loading...</div>;
  }

  return (
    <section className="max-w-5xl mx-auto pt-10 min-h-screen">
      <h2 className="text-3xl font-bold text-center mt-10">
        Transaction History
      </h2>
      <div>
        <SortDropDown />
      </div>
      <div>
        <ExpandableCardDemo tx={tx} />
      </div>
    </section>
  );
};
export default HistoryDash;
