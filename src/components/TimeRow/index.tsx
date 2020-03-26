import React from 'react'
import styled from 'styled-components'
import ProgressBar from '../ProgressBar'
import type { Period, PeriodStatus } from '../../types'
import { pad } from '../../utils/formats'

const Wrapper = styled.div`
	margin-top: 10px;
	&[data-nextspace='true'] {
		border-bottom: #717b8a dashed;
		padding-bottom: 5px;
	}
`
const Row = styled.div`
	display: flex;
	font-size: 1.5em;
	font-weight: 700;
	padding: 2.5px 0;
`

const TimeRange = styled.div`
	flex: auto;
`
const Remain = styled.div`
	font-size: 0.6em;
	align-self: flex-end;
	padding-left: 5px;
`
const Status = styled.div`
	font-size: 0.6em;
	align-self: flex-end;
`

const StRow = styled.div<{ color: string }>`
	margin-left: 5px;
	display: flex;
	>div {
		color: ${p => p.color};
	}
`

const PeriodLabel = styled.div`
	width: 50px;
	margin-left: 5px;
	color: #a6ccff;
`

function getStatus(st: PeriodStatus) {
	if (st === null) {
		return null
	}
	const { color, label } = {
		before: { color: 'black', label: '' },
		progress: { color: '#ebe971', label: 'Now' },
		finish: { color: 'gray', label: 'Fin' },
	}[st.type]

	return (
		<StRow color={color}>
			<div>{label}</div>
		</StRow>
	)
}

function remainLabel(st: PeriodStatus) {
	if (st === null || st.type !== 'progress') {
		return null
	}
	return <span>({100 - st.progress}min)</span>
}

const TimeRow = ({
	period,
	nextBreak,
}: {
	period: Period,
	nextBreak: boolean,
}) => (
	<Wrapper data-nextspace={nextBreak}>
		<Row>
			<PeriodLabel>{period.info.period.toLowerCase()}.</PeriodLabel>
			<TimeRange>
				{pad(period.info.start)} - {pad(period.info.end)}
			</TimeRange>
			<Remain>{remainLabel(period.status)}</Remain>
			<Status>{getStatus(period.status)}</Status>
		</Row>
		<ProgressBar status={period.status} />
	</Wrapper>
)

export default TimeRow
