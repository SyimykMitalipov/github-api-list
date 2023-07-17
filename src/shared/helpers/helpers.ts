import { REQUEST_STATUSES } from "shared/constants/constants";

interface IQueryCases<T> {
  status: T,
  data: T,
  error: T,
  options?: { concat: boolean }
}

interface IPayloadInterface {
  payload: any,
}

interface Builder {
  addCase: (actionCreator: string, reducer: (...arg: any) => void) => Builder
}

const resultsKey = 'results';
const count = 'count';


export const addQueryCases = (
  builder: Builder,
  thunk: any,
  { status, data, error, options = { concat: false } }: IQueryCases<string>,
) => {
  builder
    .addCase(thunk.pending, (state: any) => {
      state[ status ] = REQUEST_STATUSES.REQUESTED;
    })
    .addCase(thunk.fulfilled, (state: any, { payload }: IPayloadInterface) => {
      state[ status ] = REQUEST_STATUSES.SUCCEEDED;

      if (options.concat) {
        const items = payload.results ?? payload;

        for (const key in payload) {
          if (key === resultsKey) {
            state[ data ].results = [ ...state[ data ].results, ...items ];
            continue;
          }
          if (key === count) {
            state[ data ][ key ] += payload[ key ];
            continue;
          }
          state[ data ][ key ] = payload[ key ];
        }
      } else {
        state[ data ] = payload;
      }
    })
    .addCase(thunk.rejected, (state: any, action: any) => {
      state[ status ] = REQUEST_STATUSES.FAILED;
      state[ error ] = action.error;
    });
};