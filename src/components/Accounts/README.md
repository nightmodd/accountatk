# form with the following features:
- editing an existing item
- creating new items

# data state is outside the form (array of acpcounts)

# app state
```
const [] = useState([]) // all data 
const [] = useState(null | {} | number) // if not editing null, if editing either:

{
    id: x
}

{
    id: x,
    ...etc
}

id