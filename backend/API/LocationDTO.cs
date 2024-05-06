namespace API
{
    public class LocationDTO
    {
        public int? Id { get; set; }
        public int campaignId { get; set; }
        public string Plane { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
    }
}
