'use client'
import React, { useState } from "react";
import EmptyListLabel from "@/components/EmptyListPlaceholder";
import NavLinkLabel from "@/components/NavLinkLabel";
import _ from 'lodash';
import AddLinkBar from "@/components/AddLinkBar";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export enum LabelState {
  CREATE_OR_EDIT = "createOrEdit",
  DISPLAY = "display",
}

export interface BordersConfig {
  bottomLeft: boolean;
  topRight: boolean;
  topLeft: boolean;
}

export interface navLink {
  chierarchyIndex: number;
  parentId?: string;
  state: LabelState;
  label: string;
  url: string;
  id: string;
}

export default function Home() {
  const [navLinks, setNavLinks] = useState<navLink[]>([]);
  const getExistingOrPrevValue = (prevValue: string, nextValue?: string): string => !!nextValue && prevValue !== nextValue ? nextValue : prevValue;
  const showAddLinkBar = navLinks.length > 1 || navLinks.length === 1 && navLinks[0].state === LabelState.DISPLAY;
  const navLinksWithoutParents = navLinks.filter(link => !link?.parentId);
  const sortedNavLinks: navLink[] = [];

  const handleAddNavLink = (parentId?: string) => {
    const newNavLinks = structuredClone(navLinks);
    const parentChierarchyIndex = newNavLinks.find(link => link.id === parentId)?.chierarchyIndex;
    const linkCherarchyIndex = parentChierarchyIndex !== undefined ? parentChierarchyIndex + 1 : 0;

    const data = {
      chierarchyIndex: linkCherarchyIndex,
      state: LabelState.CREATE_OR_EDIT,
      id: _.uniqueId("link_"),
      label: "",
      url: "",
    }

    if (parentId) {
      Object.assign(data, { parentId })
    }

    newNavLinks.push(data)
    setNavLinks(newNavLinks)
  }

  const handleDeleteNavLink = (id: string) => {
    const newNavLinks = navLinks.filter(link => link.id !== id && link.parentId !== id)
    setNavLinks(newNavLinks)
  }

  const handleEditNavLink = (id: string) => {
    handleUpdateNavLinks({
      id,
      state: LabelState.CREATE_OR_EDIT
    })
  }

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

  const findChildNavLinks = (id: string) => {
    const childLinks = navLinks.filter(link => link.parentId === id);
    addLinksToArray(childLinks);
  }

  const addLinksToArray = (links: navLink[]) => {
    links.forEach(link => {
      sortedNavLinks.push(link);
      findChildNavLinks(link.id)
    })
  }

  addLinksToArray(navLinksWithoutParents)

  const getBordersConfig = (index: number): BordersConfig => {
    const bordersConfig: BordersConfig = { topLeft: false, bottomLeft: false, topRight: false };
    const isFirstLink = index === 0;

    const nextLink = sortedNavLinks?.[index + 1]
    const prevLink = sortedNavLinks?.[index - 1]

    const nextLinkUnder = nextLink && sortedNavLinks[index].chierarchyIndex < sortedNavLinks[index + 1].chierarchyIndex;
    const prevLinkUnder = prevLink && sortedNavLinks[index].chierarchyIndex < sortedNavLinks[index - 1].chierarchyIndex;
    const nextLinkOver = nextLink && sortedNavLinks[index].chierarchyIndex > sortedNavLinks[index + 1].chierarchyIndex;

    if (isFirstLink) {
      bordersConfig.topRight = true
    }

    if (isFirstLink || prevLinkUnder && sortedNavLinks[index].chierarchyIndex) {
      bordersConfig.topLeft = true
    }

    if (sortedNavLinks[index].chierarchyIndex > 0 && (nextLinkUnder || nextLinkOver && !prevLinkUnder || !nextLink && !prevLinkUnder)) {
      bordersConfig.bottomLeft = true
    }

    return bordersConfig;
  }

  const getLinkPosition = (id): number => {
    return sortedNavLinks.findIndex(link => link.id === id)
  }

  const updateChierarchyAndParent = (activeId, overId) => {
    const replacedLinktIndex = getLinkPosition(overId);
    const draggedLinkIndex = getLinkPosition(activeId);

    if (replacedLinktIndex === -1 || draggedLinkIndex === -1) return;

    if (sortedNavLinks[replacedLinktIndex]?.parentId) {
      sortedNavLinks[draggedLinkIndex].parentId = sortedNavLinks[replacedLinktIndex].parentId
    } else {
      delete sortedNavLinks[draggedLinkIndex].parentId
    }

    sortedNavLinks[draggedLinkIndex].chierarchyIndex = sortedNavLinks[replacedLinktIndex].chierarchyIndex
    setNavLinks(arrayMove(sortedNavLinks, draggedLinkIndex, replacedLinktIndex))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) return;
    updateChierarchyAndParent(active.id, over?.id)
  }

  return (
    <div className="font-[family-name:var(--font-inter)] w-[100%] h-[100%] bg-[#f5f4f4] py-[30px] px-[24px]">
      {sortedNavLinks.length ? (
        <>
          <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <SortableContext items={sortedNavLinks} strategy={verticalListSortingStrategy}>
              {
                sortedNavLinks.map((link, index) => (
                  <NavLinkLabel
                    isOnlyLabel={sortedNavLinks.length === 1}
                    index={index}
                    bordersConfig={getBordersConfig(index)}
                    handleUpdate={handleUpdateNavLinks}
                    handleDelete={handleDeleteNavLink}
                    handleEdit={handleEditNavLink}
                    handleAdd={handleAddNavLink}
                    key={link.id}
                    {...link}
                  />
                ))
              }
            </SortableContext>
          </DndContext>
          {showAddLinkBar && <AddLinkBar handleAdd={handleAddNavLink} top={`-${sortedNavLinks.length}px`} />}
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
