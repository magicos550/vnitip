import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamsList } from './Index'

export type NavigationProp = NativeStackScreenProps<StackParamsList, keyof StackParamsList>

export interface iSettings {
  area: string
  housing: string
  line: string
}
