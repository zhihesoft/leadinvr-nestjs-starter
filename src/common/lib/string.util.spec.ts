import { replaceString, splitString, unescapeHTML } from "./string.util";

test("replaceString", () => {
    expect(replaceString("hello world", ["hello", "hi"])).toBe("hi world");
    expect(replaceString("hello world", ["hello", "hi"], ["world", "everyone"])).toBe("hi everyone");
    expect(replaceString("hello world", ["hello", "hi"], ["world", "everyone"], ["hi", "hello"])).toBe(
        "hello everyone",
    );
});

test("splitString", () => {
    expect(splitString("hello,world", ",")).toEqual(["hello", "world"]);
    expect(splitString("hello|world", "|")).toEqual(["hello", "world"]);
    expect(splitString("hello,world|foo", ",", "|")).toEqual(["hello", "world", "foo"]);
    expect(splitString("hello, world | foo", ",", "|")).toEqual(["hello", "world", "foo"]);
});

test("unescapeHTML", () => {
    expect(unescapeHTML("&lt;div&gt;Hello &amp; World!&lt;/div&gt;")).toBe("<div>Hello & World!</div>");
    expect(unescapeHTML("&quot;Hello&quot; &amp; &#39;World&#39;")).toBe("\"Hello\" & 'World'");
    expect(unescapeHTML("&#xa;Hello&#xa;World&#xa;")).toBe("\nHello\nWorld\n");
});
