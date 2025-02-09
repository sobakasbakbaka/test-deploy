import {
  Badge,
  Button,
  Card,
  Center,
  Flex,
  Group,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";

export const App = () => {
  const [search, setSearch] = useState<string>("");
  const [shop, setShop] = useState<string | null>("");
  const [sort, setSort] = useState<string | null>("");
  const [data, setData] = useState<
    { Name: string; Source: string; Price: number }[]
  >([]);

  const handleSetSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    const queryParams = {
      search,
      shop: shop || "",
      sort: sort || "",
    };

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });

    const url = `https://price-tracker-back-production.up.railway.app/parse?${params.toString()}`;

    const response = await fetch(url).then((res) => res.json());
    setData(response);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const memoizedData = useMemo(() => data, [data]);

  const Row = useCallback(
    ({ index, style }: ListChildComponentProps) => {
      const item = memoizedData[index];
      if (!item) return null;

      return (
        <div style={{ ...style }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ height: "120px" }}
          >
            <Flex direction="column" justify={"space-between"} h={"100%"}>
              <Text size="sm" c="dimmed" lineClamp={1} w={300}>
                {item.Name}
              </Text>
              <Text fw={500}>{item.Price} рупий</Text>
              <Text size="xs" c="dimmed">
                {item.Source}
              </Text>
            </Flex>
          </Card>
        </div>
      );
    },
    [memoizedData]
  );

  return (
    <div>
      <Flex
        direction="column"
        gap={16}
        component="form"
        onSubmit={handleSubmit}
        style={{ padding: "1rem" }}
      >
        <TextInput
          label="Search"
          placeholder="Write phone name"
          defaultValue={search}
          onChange={handleSetSearch}
        />
        <Select
          label="Select shop"
          placeholder="Pick value"
          data={["store77", "indexiq", "biggeek"]}
          value={shop}
          onChange={setShop}
          clearable
        />
        <Select
          label="Select sort"
          placeholder="Pick value"
          data={["desc", "asc"]}
          value={sort}
          onChange={setSort}
          clearable
        />
        <Button type="submit">Submit</Button>
      </Flex>

      <Center p="1rem">
        {memoizedData.length > 0 ? (
          <FixedSizeList
            height={500}
            width="100%"
            itemSize={136}
            itemCount={memoizedData.length}
          >
            {Row}
          </FixedSizeList>
        ) : (
          <Text>Нет данных</Text>
        )}
      </Center>
    </div>
  );
};
