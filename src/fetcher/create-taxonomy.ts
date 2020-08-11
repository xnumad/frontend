import { createExercise, createExerciseGroup } from './create-exercises'
import { convertState } from './fetch-page-data'
import {
  TaxonomyTerm,
  TaxonomyTermChild,
  TaxonomyTermChildOnX,
  TaxonomyTermChildrenLevel2,
  TaxonomyTermChildrenLevel1,
} from './query'
import {
  TaxonomyData,
  FrontendExerciseNode,
  FrontendExerciseGroupNode,
  TaxonomyLink,
  TaxonomySubTerm,
} from '@/data-types'
import { hasSpecialUrlChars } from '@/helper/check-special-url-chars'

export function buildTaxonomyData(uuid: TaxonomyTerm): TaxonomyData {
  const children = uuid.children?.filter(isActive)

  return {
    description: uuid.description ? convertState(uuid.description) : undefined,
    title: uuid.name,
    id: uuid.id,

    articles: collectType(children, 'Article'),
    exercises: collectTopicFolders(children),
    videos: collectType(children, 'Video'),
    applets: collectType(children, 'Applet'),
    courses: collectType(children, 'Course'),

    exercisesContent: collectExercises(children),
    subterms: collectNestedTaxonomyTerms(children), // nested taxonomy terms
  }
}

function isActive(child: TaxonomyTermChild) {
  return child.trashed === false && child.__typename !== 'UnsupportedUuid'
}

function collectExercises(children: TaxonomyTerm['children']) {
  let index = 0
  const result: (FrontendExerciseNode | FrontendExerciseGroupNode)[] = []
  children.forEach((child) => {
    if (child.__typename === 'Exercise' && child.currentRevision) {
      result.push(createExercise(child, index++))
    }
    if (child.__typename === 'ExerciseGroup' && child.currentRevision) {
      result.push(createExerciseGroup(child, index++))
    }
  })
  return result
}

function collectType(
  children: (TaxonomyTermChildrenLevel1 | TaxonomyTermChildrenLevel2)[],
  typename: TaxonomyTermChildOnX['__typename']
) {
  const result: TaxonomyLink[] = []
  children.forEach((child) => {
    if (child.__typename === typename && child.alias && child.currentRevision)
      result.push({
        title: child.currentRevision.title,
        url: getAlias(child),
      })
  })
  return result
}

function getAlias(child: { alias?: string | null; id: number }) {
  if (!child.alias || hasSpecialUrlChars(child.alias)) return `/${child.id}`
  else return child.alias
}

function collectTopicFolders(
  children: (TaxonomyTermChildrenLevel1 | TaxonomyTermChildrenLevel2)[]
) {
  const result: TaxonomyLink[] = []
  children.forEach((child) => {
    if (
      child.__typename === 'TaxonomyTerm' &&
      (child.type === 'topicFolder' || child.type === 'curriculumTopicFolder')
    )
      result.push({
        title: child.name,
        url: getAlias(child),
      })
  })
  return result
}

function collectNestedTaxonomyTerms(
  children: TaxonomyTerm['children']
): TaxonomySubTerm[] {
  const result: TaxonomySubTerm[] = []
  children.forEach((child) => {
    if (
      child.__typename === 'TaxonomyTerm' &&
      child.type !== 'topicFolder' &&
      child.type !== 'curriculumTopicFolder'
    ) {
      const subchildren = child.children?.filter(isActive)
      result.push({
        title: child.name,
        url: getAlias(child),
        description: child.description
          ? convertState(child.description)
          : undefined,
        articles: collectType(subchildren, 'Article'),
        exercises: collectTopicFolders(subchildren),
        videos: collectType(subchildren, 'Video'),
        applets: collectType(subchildren, 'Applet'),
        courses: collectType(subchildren, 'Course'),
        folders: collectSubfolders(subchildren),
      })
    }
  })
  return result
}

function collectSubfolders(children: TaxonomyTermChildrenLevel2[]) {
  const result: TaxonomyLink[] = []
  children.forEach((child) => {
    if (
      child.__typename === 'TaxonomyTerm' &&
      child.type !== 'topicFolder' &&
      child.type !== 'curriculumTopicFolder'
    )
      result.push({ title: child.name, url: getAlias(child) })
  })
  return result
}