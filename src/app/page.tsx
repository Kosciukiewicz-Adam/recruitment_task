'use client'
import React, { useState } from "react";
import EmptyListLabel from "@/components/EmptyListPlaceholder";
import NavLinkLabel from "@/components/NavLinkLabel";
import _ from 'lodash'

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

  const handleEdit = (id: string) => {
    updateLinkData({
      id,
      state: LabelState.CREATE_OR_EDIT
    })
  }

  const getExistingOrPrevValue = (prevValue: string, nextValue?: string): string => !!nextValue && prevValue !== nextValue ? nextValue : prevValue

  const updateLinkData = (data: Partial<navLink>) => {
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

  return (
    <div className="font-[family-name:var(--font-inter)] w-[100%] h-[100%] bg-[#f5f4f4] py-[30px] px-[24px]">
      {navLinks.length ? (
        <>{
          navLinks.map(link => (
            <NavLinkLabel
              handleDelete={handleDeleteNavLink}
              updateLinkData={updateLinkData}
              handleEdit={handleEdit}
              key={link.label}
              {...link}
            />
          ))
        }</>
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
