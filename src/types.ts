import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type NavigationProp = NativeStackScreenProps<StackParamsList, keyof StackParamsList>

export interface iSettings {
  area: string
  housing: string
  line: string
}

export type StackParamsList = {
  Authorization: undefined
  Home: undefined
  Jobs: undefined
  Settings: undefined

  EggCollection: undefined
  EggMass: undefined
  LiveWeight: undefined
  Appraisal: undefined
}

export interface iAppraisalItem {
  id?: number | null
  user: string
  barcode: string
  mass: number
  chest: number
  legs: number
  remark: string
  date: string
}

export interface iEggItem {
  id?: number | null
  user: string
  barcode: string
  mass: number
  date: string
}

export interface iLiveWeightItem {
  id?: number | null
  barcode: string
  mass: number
  date: string
}
