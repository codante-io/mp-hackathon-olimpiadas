export class GraphqlAdapter {
  public static perform = async (fn: any, args: any, _: any = null): Promise<any> => {
    return fn(args.input)
  }
}