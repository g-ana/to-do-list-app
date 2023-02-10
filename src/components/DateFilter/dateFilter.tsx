import {ComponentProps, useRef, useState} from "react";
import {DateFilterType} from "../../types/enumerations/dateFilterType";
import {DateFilter as DF} from "../../types/classes/dateFilter";

export const DateFilter = (props : ComponentProps<any>) => {
    const [dateFilter, setDateFilter] = useState(new DF());
    const [dateFilterType, setDateFilterType] = useState(DateFilterType.EXACT);
    const [startDate, setStartDate] = useState(new Date(Date.now().toString()));
    const [endDate, setEndDate] = useState(new Date(Date.now().toString()));
    const [isModal, setIsModal] = useState(true);
    const dialog = useRef(null);
    const generateFilter = (dateFilterType? : DateFilterType) : any => {
       if (dateFilterType === DateFilterType.BETWEEN) {
           return (
               <>
                   <div role={"group"}>
                       <label htmlFor={"fromDate"} id={"fromDateLabel"}
                              role={"complementary"}>From date</label>
                       <input type={"date"} inputMode={"text"} name={"fromDate"} id={"fromDate"}
                              placeholder={"From"} required aria-required={"true"}
                              aria-placeholder={"From"} aria-labelledby={"dateFromLabel"}
                              defaultValue={Date.now()}/>
                   </div>
                   <div role={"group"}>
                       <label htmlFor={"toDate"} id={"toDateLabel"}
                              role={"complementary"}>To date</label>
                       <input type={"date"} inputMode={"text"} name={"toDate"} id={"toDate"} placeholder={"To"}
                              required aria-required={"true"} aria-placeholder={"To"}
                              aria-labelledby={"toDateLabel"} defaultValue={Date.now()}/>
                   </div>
               </>
           );
       }
       else {
           return (
               <div role={"group"}>
                   <label htmlFor={"date"} id={"dateLabel"} role={"complementary"}>Date</label>
                   <input type={"date"} inputMode={"text"} name={"date"} id={"date"} placeholder={"Date"}
                          required aria-placeholder={"Date"}
                          aria-required={"true"} aria-labelledby={"dateLabel"}/>
               </div>
           );
       }
    }
       return (
           <dialog open aria-modal={"true"} onClose={() => dateFilter.cancelForm()} ref={dialog}>
               <header role={"contentinfo"}>
                   <h1 aria-level={1}>Date filters</h1>
               </header>
               <main role={"main"}>
                   <div role={"group"}>
                       <label role={"complementary"} >Select date filter</label>
                       <select value={"date"} size={4} required aria-required={"true"}
                               name={"dateFilter"} id={"dateFilter"} ref={"filter"}>
                           <optgroup label={"Date filters"} aria-label={"Date filters"} role={"group"}>
                               <option value={"date"} label={"Date"}
                                       selected aria-selected={"true"} aria-label={"Date"}>Date</option>
                               <option value={"before"} label={"Before"}
                                       aria-label={"Before"}>Before</option>
                               <option value={"after"} label={"After"}
                                       aria-label={"After"}>After</option>
                               <option value={"between"} label={"Between"}
                                       aria-label={"Between"}>Between</option>
                           </optgroup>
                       </select>
                   </div>
               </main>
               <footer role={"menu"}>
                   <menu role={"menubar"}>
                       <input type={"submit"} name={"delete"} id={"delete"} value={"Filter"}
                               onClick={() => dateFilter.submitForm()}/>
                       <input type={"button"} name={"cancel"} id={"cancel"} value={"Cancel"}
                               onClick={() => dateFilter.cancelForm()}/>
                   </menu>
               </footer>
           </dialog>
       );
}