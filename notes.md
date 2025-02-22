# Notes


## TODO
- group by company
- make logs
- loading, styling and animation
-

## Vercel Server deployment only on main branch
- go to project on vercel
- go to setting -> git -> Ignored Build Step
- set custom then type:
```
if [ "$VERCEL_GIT_BRANCH" != "main" ]; then   echo "Skipping deploy for branch $VERCEL_GIT_BRANCH";  exit 0; fi
```