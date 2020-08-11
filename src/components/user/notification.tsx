import { faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react'
import styled, { css } from 'styled-components'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
//TODO: investigate
// eslint-disable-next-line import/no-internal-modules
import de from 'timeago.js/lib/lang/de'

import {
  NotificationEvent,
  NotificationEventType,
  NotificationUser,
} from '@/events/event'

// register it.
timeago.register('de', de)

export function Notification({
  event,
  unread,
}: {
  unread: boolean
  event: NotificationEvent
}) {
  const eventDate = new Date(event.date)

  return (
    <Item>
      <span title={eventDate.toLocaleString('de-DE')}>
        <StyledTimeAgo
          datetime={eventDate}
          locale="de"
          opts={{ minInterval: 60 }}
        />
      </span>
      <Title unread={unread}>{renderTitle()}</Title>
      {renderExtraContent()}
      {renderMuteButton()}
    </Item>
  )

  function renderMuteButton() {
    const subscriptionId = getSubscriptionId()
    return subscriptionId !== undefined ? (
      <Tippy
        duration={[300, 250]}
        animation="fade"
        placement="bottom"
        content={
          <Tooltip>
            Benachrichtigungen für diesen Inhalt nicht mehr anzeigen.
          </Tooltip>
        }
      >
        <MuteButton href={`/unsubscribe/${subscriptionId.toString()}`}>
          <FontAwesomeIcon icon={faVolumeMute} />
        </MuteButton>
      </Tippy>
    ) : null
  }

  function getSubscriptionId() {
    switch (event.type) {
      case NotificationEventType.SetThreadState:
      case NotificationEventType.CreateThread:
        return event.thread

      case NotificationEventType.CreateComment:
        return event.thread.id

      case NotificationEventType.CreateEntity:
      case NotificationEventType.SetLicense:
      case NotificationEventType.CreateLink:
      case NotificationEventType.RemoveLink:
        return event.entity

      case NotificationEventType.CreateEntityRevision:
      case NotificationEventType.CheckoutRevision:
      case NotificationEventType.RejectRevision:
        return event.repository.id

      case NotificationEventType.CreateTaxonomyAssociation:
      case NotificationEventType.RemoveTaxonomyAssociation:
        return event.entity.id

      case NotificationEventType.SetUuidState:
        return event.uuid

      default:
        return undefined
    }
  }

  function renderTitle() {
    switch (event.type) {
      case NotificationEventType.SetThreadState:
        return (
          <>
            <UserLink user={event.actor} /> hat Thread {event.thread.id}
            {event.archived ? 'archiviert' : 'unarchiviert'}
          </>
        )
      case NotificationEventType.CreateComment:
        return (
          <>
            <UserLink user={event.author} /> hat Kommentar {event.comment.id} im
            Thread {event.thread.id} erstellt.
          </>
        )
      case NotificationEventType.CreateThread:
        return (
          <>
            <UserLink user={event.author} /> hat Thread {event.thread.id} in
            UUID {event.uuid.id} erstellt.
          </>
        )
      case NotificationEventType.CreateEntity:
        return (
          <>
            <UserLink user={event.author} /> hat Entity {event.entity.id}{' '}
            erstellt.
          </>
        )
      case NotificationEventType.SetLicense:
        return (
          <>
            <UserLink user={event.actor} /> hat die Lizenz von Entity{' '}
            {event.entity.id} geändert.
          </>
        )
      case NotificationEventType.CreateLink:
        return (
          <>
            <UserLink user={event.actor} /> hat Entity {event.entity.id} mit
            UUID {event.parent.id} verknüpft.
          </>
        )
      case NotificationEventType.RemoveLink:
        return (
          <>
            <UserLink user={event.actor} /> hat die Verknüpfung von{' '}
            {event.entity.id} mit UUID {event.parent.id} entfernt.
          </>
        )
      case NotificationEventType.CreateEntityRevision:
        return (
          <>
            <UserLink user={event.author} /> hat die{' '}
            <ContentLink id={event.revision.id}>Bearbeitung</ContentLink> für
            Entity/Page {event.repository.id} erstellt.
          </>
        )
      case NotificationEventType.CheckoutRevision:
        return (
          <>
            <UserLink user={event.reviewer} /> hat die{' '}
            <ContentLink id={event.revision.id}>Bearbeitung</ContentLink> für
            Entity/Page {event.repository.id} übernommen
          </>
        )
      case NotificationEventType.RejectRevision:
        return (
          <>
            <UserLink user={event.reviewer} /> hat die{' '}
            <ContentLink id={event.revision.id}>Bearbeitung</ContentLink> für
            Entity/Page {event.repository.id} verworfen
          </>
        )
      case NotificationEventType.CreateTaxonomyAssociation:
        return (
          <>
            <UserLink user={event.actor} /> hat die Entity {event.entity.id} in
            Taxonomy Term {event.taxonomyTerm.id} eingeordnet.
          </>
        )
      case NotificationEventType.RemoveTaxonomyAssociation:
        return (
          <>
            <UserLink user={event.actor} /> hat die Entity {event.entity.id} aus
            Taxonomy Term {event.taxonomyTerm.id} entfernt.
          </>
        )
      case NotificationEventType.CreateTaxonomyTerm:
        return (
          <>
            <UserLink user={event.actor} /> hat den Taxonomy Term{' '}
            {event.taxonomyTerm.id} erstellt.
          </>
        )
      case NotificationEventType.SetTaxonomyTerm:
        return (
          <>
            <UserLink user={event.actor} /> hat den Taxonomy Term{' '}
            {event.taxonomyTerm.id} geändert.
          </>
        )
      case NotificationEventType.SetTaxonomyParent:
        return (
          <>
            <UserLink user={event.actor} /> hat den Elternknoten des Terms{' '}
            {event.taxonomyTerm.id} von ${event.previousParent.id} auf{' '}
            {event.parent.id} geändert.
          </>
        )
      case NotificationEventType.SetUuidState:
        return (
          <>
            <UserLink user={event.actor} /> hat den Uuid {event.uuid.id}{' '}
            {event.trashed
              ? 'in den Papierkorb verschoben'
              : 'aus dem Papierkorb wieder hergestellt'}
            .
          </>
        )
    }
  }

  function renderExtraContent() {
    if (
      event.type === NotificationEventType.RejectRevision ||
      event.type === NotificationEventType.CheckoutRevision
    ) {
      return <Content>{event.reason}</Content>
    }
  }
}

function UserLink({ user }: { user: NotificationUser }) {
  return (
    <StyledLink href={`/user/profile/${user.id}`}>{user.username}</StyledLink>
  )
}

interface ContentLink {
  id: number
  children: string
}

function ContentLink(props: ContentLink) {
  return <StyledLink href={`/${props.id}`}>{props.children}</StyledLink>
}

const StyledLink = styled.a`
  color: ${(props) => props.theme.colors.brand};
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.colors.lightblue};
  }
`

const StyledTimeAgo = styled(TimeAgo)`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.gray};
`

const MuteButton = styled.a`
  position: absolute;
  opacity: 0;
  display: flex;
  justify-content: center;
  right: 20px;
  top: 30px;
  padding: 10px;
  border-radius: 2rem;
  transition: all 0.2s ease-in;
  color: ${(props) => props.theme.colors.brand};

  &:hover {
    background-color: ${(props) => props.theme.colors.brand};
    color: #fff;
  }
`

const Tooltip = styled.span`
  font-size: 0.8rem;
  line-height: 1.2rem;
  display: block;
  background-color: ${(props) => props.theme.colors.darkgray};
  color: #fff;
  border-radius: 4px;
  padding: 8px 10px;
  max-width: 200px;
`

const Item = styled.div`
  position: relative;
  margin: 10px 0;
  padding: 24px;
  &:nth-child(even) {
    background: ${(props) => props.theme.colors.bluewhite};
  }

  &:hover ${MuteButton} {
    opacity: 1;
  }
`

const Content = styled.span`
  color: ${(props) => props.theme.colors.gray};
  display: block;
`

const Title = styled.span<{ unread: boolean }>`
  ${(props) =>
    props.unread &&
    css`
      font-weight: bold;
      &:before {
        content: '';
        display: inline-block;
        background: ${props.theme.colors.brand};
        border-radius: 50%;
        width: 10px;
        height: 10px;
        margin-right: 7px;
      }
    `}

  display:block;
  margin-bottom: 9px;
  margin-top: 1px;

  a {
    color: ${(props) => props.theme.colors.brand};
    text-decoration: none;
  }
  a:hover {
    color: ${(props) => props.theme.colors.lightblue};
  }
`