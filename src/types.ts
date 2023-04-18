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
