'use client'
import React, { useState } from "react";
import EmptyListLabel from "@/components/EmptyListPlaceholder";
import NavLinkLabel from "@/components/NavLinkLabel";
import _ from 'lodash';
import AddLinkBar from "@/components/AddLinkBar";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { NavLink, BordersConfig } from "@/types";
import { LabelState } from "@/consts";

export default function Home(): JSX.Element {
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const showAddLinkBar = navLinks.length > 1 || navLinks.length === 1 && navLinks[0].state === LabelState.DISPLAY;
  const getExistingOrPrevValue = (prevValue: string, nextValue?: string): string => !!nextValue && prevValue !== nextValue ? nextValue : prevValue;
  const getNavLinkIndexById = (id: string): number => navLinks.findIndex(link => link.id === id);

  const getSortedNavLinks = (linkArray: NavLink[]): NavLink[] => {
    const sortedNavLinks: NavLink[] = [];

    const navLinksWithoutParents = linkArray.filter(link => !link?.parentId);
    const findChildNavLinks = (id: string) => addLinksToArray(linkArray.filter(link => link.parentId === id))
    const addLinksToArray = (links: NavLink[]) => links.forEach(link => {
      sortedNavLinks.push(link);
      findChildNavLinks(link.id)
    })
    addLinksToArray(navLinksWithoutParents)

    return sortedNavLinks;
  }

  const handleAddNavLink = (parentId?: string) => {
    const parentChierarchyIndex = navLinks.find(link => link.id === parentId)?.chierarchyIndex;
    const linkCherarchyIndex = parentChierarchyIndex !== undefined ? parentChierarchyIndex + 1 : 0;

    const data: NavLink = {
      chierarchyIndex: linkCherarchyIndex,
      state: LabelState.CREATE_OR_EDIT,
      id: _.uniqueId("link_"),
      label: "",
      url: "",
    }

    if (parentId) {
      Object.assign(data, { parentId })
    }

    setNavLinks(getSortedNavLinks([...navLinks, data]))
  }

  const handleDeleteNavLink = (id: string) => {
    const newNavLinks = navLinks.filter(link => link.id !== id && link.parentId !== id)
    setNavLinks(getSortedNavLinks(newNavLinks))
  }

  const handleEditNavLink = (id: string) => handleUpdateNavLinks({
    id,
    state: LabelState.CREATE_OR_EDIT
  })

  const handleUpdateNavLinks = (data: Partial<Omit<NavLink, 'id'>> & Pick<NavLink, 'id'>) => {
    const navLinkIndex = getNavLinkIndexById(data.id);
    const newNavLinks = structuredClone(navLinks);

    newNavLinks[navLinkIndex] = {
      ...newNavLinks[navLinkIndex],
      state: getExistingOrPrevValue(newNavLinks[navLinkIndex].state, data?.state) as LabelState,
      label: getExistingOrPrevValue(newNavLinks[navLinkIndex].label, data?.label),
      url: getExistingOrPrevValue(newNavLinks[navLinkIndex].url, data?.url)
    }

    setNavLinks(getSortedNavLinks(newNavLinks))
  }

  const updateChierarchyAndParent = (activeId: string, overId: string) => {
    const newNavLinks = structuredClone(navLinks);
    const replacedLinktIndex = getNavLinkIndexById(overId);
    const draggedLinkIndex = getNavLinkIndexById(activeId);

    if (replacedLinktIndex === -1 || draggedLinkIndex === -1) return;

    if (newNavLinks[replacedLinktIndex]?.parentId) {
      newNavLinks[draggedLinkIndex].parentId = newNavLinks[replacedLinktIndex].parentId
    } else {
      delete newNavLinks[draggedLinkIndex].parentId
    }

    newNavLinks[draggedLinkIndex].chierarchyIndex = newNavLinks[replacedLinktIndex].chierarchyIndex;

    newNavLinks.forEach((link, index) => {
      if (link.parentId === newNavLinks[draggedLinkIndex].id) {
        newNavLinks[index].chierarchyIndex = newNavLinks[replacedLinktIndex].chierarchyIndex + 1;
      }
    })

    setNavLinks(getSortedNavLinks(arrayMove(newNavLinks, draggedLinkIndex, replacedLinktIndex)))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id || navLinks[getNavLinkIndexById(active.id as string)]?.state === LabelState.CREATE_OR_EDIT) return;
    updateChierarchyAndParent(active.id as string, over?.id as string)
  }

  const getBordersConfig = (index: number): BordersConfig => {
    const bordersConfig: BordersConfig = { topLeft: false, bottomLeft: false, topRight: false };
    const isFirstLink = index === 0;

    const nextLink = navLinks?.[index + 1]
    const prevLink = navLinks?.[index - 1]

    const nextLinkUnder = nextLink && navLinks[index].chierarchyIndex < navLinks[index + 1].chierarchyIndex;
    const prevLinkUnder = prevLink && navLinks[index].chierarchyIndex < navLinks[index - 1].chierarchyIndex;
    const nextLinkOver = nextLink && navLinks[index].chierarchyIndex > navLinks[index + 1].chierarchyIndex;

    if (isFirstLink) {
      bordersConfig.topRight = true
    }

    if (isFirstLink || prevLinkUnder && navLinks[index].chierarchyIndex) {
      bordersConfig.topLeft = true
    }

    if (navLinks[index].chierarchyIndex > 0 && (nextLinkUnder || nextLinkOver && !prevLinkUnder || !nextLink && !prevLinkUnder)) {
      bordersConfig.bottomLeft = true
    }

    return bordersConfig;
  }

  return (
    <div className="font-[family-name:var(--font-inter)] w-[100%] h-[100%] bg-[#f5f4f4] py-[30px] px-[24px]">
      {navLinks.length ? (
        <>
          <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <SortableContext items={navLinks} strategy={verticalListSortingStrategy}>
              {
                navLinks.map((link, index) => (
                  <NavLinkLabel
                    isOnlyLabel={navLinks.length === 1}
                    bordersConfig={getBordersConfig(index)}
                    handleUpdate={handleUpdateNavLinks}
                    handleDelete={handleDeleteNavLink}
                    handleEdit={handleEditNavLink}
                    handleAdd={handleAddNavLink}
                    index={index}
                    key={link.id}
                    {...link}
                  />
                ))
              }
            </SortableContext>
          </DndContext>
          {showAddLinkBar && <AddLinkBar handleAdd={handleAddNavLink} top={`-${navLinks.length}px`} />}
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
