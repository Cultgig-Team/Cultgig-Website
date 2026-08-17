import { createContext, useContext, useReducer } from 'react';
import type { OnboardingData, Role } from '../types/onboarding';
const initialData:OnboardingData={email:'',role:null,fullName:'',city:'',photo:null,bio:'',category:null,willingToTravel:null,portfolio:[],instagram:'',youtube:'',website:'',budget:[1000,10000],budgetConfirmed:false,experience:null,interests:[],businessEmail:'',businessPhone:'',businessAddress:''};
type Action={type:'patch';value:Partial<OnboardingData>}|{type:'reset';role?:Role};
function reducer(state:OnboardingData,action:Action):OnboardingData{return action.type==='patch'?{...state,...action.value}:{...initialData,role:action.role??null};}
const Context=createContext<{data:OnboardingData;patch:(value:Partial<OnboardingData>)=>void;reset:(role?:Role)=>void}|null>(null);
export function OnboardingProvider({children}:{children:React.ReactNode}){const [data,dispatch]=useReducer(reducer,initialData);return <Context.Provider value={{data,patch:value=>dispatch({type:'patch',value}),reset:role=>dispatch({type:'reset',role})}}>{children}</Context.Provider>}
export function useOnboarding(){const value=useContext(Context);if(!value)throw new Error('useOnboarding must be used inside OnboardingProvider');return value;}
