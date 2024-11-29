'use client'
import React, { useState } from "react";
import EmptyListLabel from "@/components/EmptyListPlaceholder";
import NavLinkLabel from "@/components/NavLinkLabel";
import _ from 'lodash'
import AddLinkBar from "@/components/AddLinkBar";

export enum LabelState {
  CREATE_OR_EDIT = "createOrEdit",
  DISPLAY = "display",
}

export interface navLink {
  state: LabelState;
  label: string;
  url: string;
  id: string;
}

export default function Home() {
  const [navLinks, setNavLinks] = useState<navLink[]>([
    {
      state: LabelState.DISPLAY,
      id: _.uniqueId(),
      label: "Promocje",
      url: "https://rc32141.redcart.pl/promocje",
    }
  ])

  const handleAddNavLink = () => {
    const newNavLinks = structuredClone(navLinks);
    newNavLinks.push({
      state: LabelState.CREATE_OR_EDIT,
      id: _.uniqueId(),
      label: "",
      url: "",
    })
    setNavLinks(newNavLinks)
  }

  const handleDeleteNavLink = (id: string) => {
    const newNavLinks = navLinks.filter(link => link.id !== id)
    setNavLinks(newNavLinks)
  }

  const handleEditNavLink = (id: string) => {
    handleUpdateNavLinks({
      id,
      state: LabelState.CREATE_OR_EDIT
    })
  }

  const getExistingOrPrevValue = (prevValue: string, nextValue?: string): string => !!nextValue && prevValue !== nextValue ? nextValue : prevValue

  const handleUpdateNavLinks = (data: Partial<navLink>) => {
    const linkInArray = navLinks.find(link => link.id === data?.id);

    if (linkInArray) {
      const linkIndex = navLinks.indexOf(linkInArray)
      const newNavLinks = structuredClone(navLinks);

      newNavLinks[linkIndex].state = getExistingOrPrevValue(newNavLinks[linkIndex].state, data?.state) as LabelState
      newNavLinks[linkIndex].label = getExistingOrPrevValue(newNavLinks[linkIndex].label, data?.label)
      newNavLinks[linkIndex].url = getExistingOrPrevValue(newNavLinks[linkIndex].url, data?.url)

      setNavLinks(newNavLinks)
    }
  }

  const showAddLinkBar = navLinks.length > 1 || navLinks.length === 1 && navLinks[0].state === LabelState.DISPLAY;

  return (
    <div className="font-[family-name:var(--font-inter)] w-[100%] h-[100%] bg-[#f5f4f4] py-[30px] px-[24px]">
      {navLinks.length ? (
        <>{
          navLinks.map((link, index) => (
            <NavLinkLabel
              isLastLink={index === navLinks.length - 1}
              handleUpdate={handleUpdateNavLinks}
              handleDelete={handleDeleteNavLink}
              handleEdit={handleEditNavLink}
              handleAdd={handleAddNavLink}
              isFirstLink={index === 0}
              key={link.id}
              {...link}
            />
          ))
        }
          {showAddLinkBar && <AddLinkBar handleAdd={handleAddNavLink} />}
        </>
      ) : (
        <EmptyListLabel
          subtitle="W tym menu nie ma jeszcze żadnych linków"
          handleBtClick={handleAddNavLink}
          buttonText="Dodaj pozycje menu"
          title="Menu jest puste"
        />
      )
      }
    </div >
  );
}
