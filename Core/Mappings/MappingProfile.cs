namespace Core.Mappings;
using AutoMapper;
using Core.DTOs;
using Core.Entities;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Carrier Mappings
        CreateMap<Carrier, CarrierResponseDto>();
       
        // Shipment Mappings
        CreateMap<Shipment, ShipmentResponseDto>();

        /* Custom Mappings
              CreateMap<ShipmentCreateDto, Shipment>();
              CreateMap<ShipmentUpdateDto, Shipment>().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
         */
        
    }
}